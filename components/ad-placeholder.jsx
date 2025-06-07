import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function AdPlaceholder({ onClose }) {
  useEffect(() => {
    // Push ad to adsbygoogle when component mounts
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error loading AdSense ad:", error);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 text-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close ad"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Google AdSense ad */}
        <div className="mb-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-7976720973471795"
            data-ad-slot="YOUR_AD_SLOT_ID" // Replace with your actual ad slot ID
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Continue exploring properties!
        </p>
        <Button
          onClick={onClose}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}