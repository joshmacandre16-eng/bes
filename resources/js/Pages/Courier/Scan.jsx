import React, { useState, useEffect, useRef } from "react";
import CourierLayout from "@/Layouts/CourierLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";
import { Camera, QrCode, PackageCheck, X, Play, Pause } from "lucide-react";

export default function ScanPage({}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedCode, setScannedCode] = useState(null);
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        let stream = null;
        let animationId = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment",
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (err) {
                console.error("Camera access denied", err);
            }
        };

        const scanQR = () => {
            if (!videoRef.current || !canvasRef.current || !isScanning) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const video = videoRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
            );
            // Simulate QR detection - in production use jsQR or similar library
            const simulatedCode = `ORDER-${Math.floor(Math.random() * 10000)}`;
            if (Math.random() > 0.7) {
                // Simulate detection
                setScannedCode(simulatedCode);
                setScanResult("detected");
                setIsScanning(false);
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                }
            }
        };

        if (isScanning) {
            startCamera();
            animationId = requestAnimationFrame(function tick() {
                scanQR();
                if (isScanning) animationId = requestAnimationFrame(tick);
            });
        }

        return () => {
            if (stream) stream.getTracks().forEach((track) => track.stop());
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isScanning]);

    const handleScan = () => {
        setIsScanning(true);
    };

    const handleManualEntry = () => {
        setScannedCode("ORDER-12345");
        setScanResult("manual");
    };

    const processPackage = () => {
        // Simulate processing
        setTimeout(() => {
            router.visit("/courier/tasks");
        }, 1500);
    };

    return (
        <CourierLayout title="QR Scanner">
            <Head title="Scan Package" />

            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Scan Package QR
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Point camera at package QR code
                    </p>
                </div>

                {scannedCode ? (
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-8 border-green-200">
                        <PackageCheck className="w-32 h-32 mx-auto mb-8 text-green-600 animate-bounce" />
                        <h2 className="text-3xl font-bold text-green-800 mb-4">
                            Package Scanned!
                        </h2>
                        <div className="bg-green-50 p-8 rounded-2xl mb-8">
                            <p className="text-2xl font-mono font-bold text-green-900 mb-2">
                                ORDER-{scannedCode}
                            </p>
                            <p className="text-lg text-green-800">
                                Ready for delivery
                            </p>
                        </div>
                        <button
                            onClick={processPackage}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 px-12 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02]"
                        >
                            Mark as Picked Up
                        </button>
                    </div>
                ) : isScanning ? (
                    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden p-8">
                        <video
                            ref={videoRef}
                            className="w-full aspect-video rounded-2xl shadow-2xl block mx-auto"
                            playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="border-4 border-green-500/30 rounded-2xl w-4/5 h-4/5 relative animate-pulse">
                                <div className="absolute inset-0 border-4 border-green-500 rounded-2xl animate-[scanner_2s_linear_infinite] bg-green-500/20" />
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-8 py-4 rounded-3xl text-lg font-bold backdrop-blur-sm">
                            Scanning... Hold steady
                        </div>
                        <style jsx>{`
                            @keyframes scanner {
                                0% {
                                    transform: translateY(-100%);
                                }
                                100% {
                                    transform: translateY(100%);
                                }
                            }
                        `}</style>
                        <button
                            onClick={() => setIsScanning(false)}
                            className="absolute top-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-3xl shadow-2xl hover:shadow-xl transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200 text-center">
                        <Camera className="w-32 h-32 mx-auto mb-8 text-gray-400" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Scan
                        </h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Use your camera to scan package QR codes
                        </p>

                        <div className="space-y-4 max-w-md mx-auto">
                            <button
                                onClick={handleScan}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 px-12 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] flex items-center gap-3 justify-center"
                            >
                                <Play size={24} />
                                Start Camera Scanner
                            </button>

                            <div className="text-sm text-gray-500 mb-6">or</div>

                            <button
                                onClick={handleManualEntry}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-6 px-12 rounded-3xl font-bold text-xl border-2 border-gray-200 hover:border-gray-400 transition-all shadow-md hover:shadow-lg"
                            >
                                Enter Order ID Manually
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-16 pt-12 border-t border-gray-200">
                            <div className="text-left">
                                <QrCode className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                                <p className="font-bold text-lg mb-2">
                                    Fast QR Scan
                                </p>
                                <p className="text-sm text-gray-600">
                                    Scan in 1 second
                                </p>
                            </div>
                            <div className="text-left">
                                <PackageCheck className="w-16 h-16 mx-auto mb-4 text-green-600" />
                                <p className="font-bold text-lg mb-2">
                                    Auto Verify
                                </p>
                                <p className="text-sm text-gray-600">
                                    Confirm package details
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CourierLayout>
    );
}
