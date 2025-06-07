"use client";

import * as React from "react";
import { BasicInformation } from "./basic-information";
import { StepsSection } from "./steps";
import { Button } from "@/components/ui/button";
import { PropertyDetailsForm } from "./add-parking-details";
import { PropertyUpload } from "@/app/dashboard/add-property/_components/property-upload";
import AmenitiesDetails from "./amenities-details";
import AddPrice from "./add-price";
import axios from "axios";
import BACKEND_URL from "@/lib/BACKEND_URL";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitPropertyDialog from "./dialogSubmitProperty";
import LoadingScreen from "./loader";
import { useToast } from "@/hooks/use-toast";
import { uploadPropertyImages, uploadPropertyVideo } from "@/lib/uploader";
const steps = [
  { number: 1, title: "Parking Details" },
  { number: 2, title: "Photos & Video" },
  { number: 3, title: "Amenities and Features" },
  { number: 4, title: "Add Price" },
];

export function AddPropertyForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [propertyData, setPropertyData] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const [files, setFiles] = React.useState({ images: [], video: null });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log(propertyData);
    if (Object.keys(propertyData).length === 0) {
      toast({
        title: "Error",
        description: "Property data is missing",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload images one by one
      const imageURLs = [];
      for (let i = 0; i < files.images.length; i++) {
        const singleImageFormData = new FormData();
        singleImageFormData.append(`images-0`, files.images[i]);
        const imageResponse = await uploadPropertyImages(singleImageFormData, 1);
        const imageResponseData = JSON.parse(imageResponse);
        
        if (!imageResponseData.success) {
          toast({
            title: "Error",
            description: imageResponseData.error,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        imageURLs.push(imageResponseData.imageURLs[0]);
      }

      // Upload video if exists
      let videoURL = null;
      if (files.video) {
        const videoFormData = new FormData();
        videoFormData.append('video', files.video);
        const videoResponse = await uploadPropertyVideo(videoFormData);
        const videoResponseData = JSON.parse(videoResponse);
        
        if (!videoResponseData.success) {
          toast({
            title: "Error",
            description: videoResponseData.error,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        videoURL = videoResponseData.videoURL;
      }

      let token = localStorage.getItem("accessToken");
      if (!token) {
        toast({
          title: "Error",
          description: "User not authenticated",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      token = token.replace(/^"|"$/g, "");

      // Format the data to match the backend schema exactly
      const formattedData = {
        spotNumber: propertyData.spotNumber,
        city: propertyData.city,
        state: propertyData.state,
        locality: propertyData.locality,
        sublocality: propertyData.sublocality || "",
        areaNumber: propertyData.areaNumber || "",
        type: propertyData.type || "standard",
        isAvailable: propertyData.isAvailable ?? true,
        hourlyRate: propertyData.hourlyRate,
        size: propertyData.size || "medium",
        amenitiesDetails: {
          securityGuard: propertyData.amenitiesDetails?.securityGuard ?? false,
          securityCameras: propertyData.amenitiesDetails?.securityCameras ?? false,
          evCharging: propertyData.amenitiesDetails?.evCharging ?? false,
          valetService: propertyData.amenitiesDetails?.valetService ?? false,
          coveredParking: propertyData.amenitiesDetails?.coveredParking ?? false
        },
        images: imageURLs,
        video: videoURL,
        accessibility: {
          wheelchairAccessible: propertyData.accessibility?.wheelchairAccessible ?? false,
          nearEntrance: propertyData.accessibility?.nearEntrance ?? false
        },
        coordinates: {
          latitude: propertyData.coordinates?.latitude || 0,
          longitude: propertyData.coordinates?.longitude || 0
        }
      };

      const response = await axios.post(
        `${BACKEND_URL}/Parking/create`,
        formattedData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      toast({
        title: "Success",
        description: "Parking spot added successfully!",
        variant: "default",
      });

      setIsSubmitting(false);
      setCurrentStep(1);
    } catch (error) {
      console.error("Full error:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);

        // Handle duplicate spot number error
        if (error.response.data?.details?.includes('duplicate key error') && 
            error.response.data?.details?.includes('spotNumber')) {
          toast({
            title: "Error",
            description: "A parking spot with this spot number already exists. Please use a different spot number.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error.response.data?.error || "Failed to add parking spot",
            variant: "destructive",
          });
        }
      } else if (error.request) {
        console.error("No response received. Request details:", error.request);
        toast({
          title: "Error",
          description: "No response from server. Please try again later.",
          variant: "destructive",
        });
      } else {
        console.error("Error setting up request:", error.message);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <StepsSection steps={steps} currentStep={currentStep} />
      <div className="flex-1 space-y-8">
        <div>
          {isSubmitting && <LoadingScreen />}
          {/* {currentStep === 1 && (
            <BasicInformation
              lookingFor={lookingFor}
              setLookingFor={setLookingFor}
              propertyKind={propertyKind}
              setPropertyKind={setPropertyKind}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />
          )} */}
          {currentStep === 1 && (
            <PropertyDetailsForm
              propertyData={propertyData}
              setPropertyData={setPropertyData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && (
            <div className="max-w-[835px] max-h-[14475px]">
              <PropertyUpload
                files={files}
                setFiles={setFiles}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          )}
          {currentStep === 3 && (
            <AmenitiesDetails
              propertyData={propertyData}
              setCurrentStep={setCurrentStep}
              setPropertyData={setPropertyData}
            />
          )}

          {currentStep === 4 && (
            <AddPrice
              propertyData={propertyData}
              setPropertyData={setPropertyData}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            {currentStep} of {steps.length} steps
          </div>
          {currentStep === 5 ? (
            <SubmitPropertyDialog
              handleSubmit={handleSubmit}
              currentStep={currentStep}
            />
          ) : (
            <Button
              onClick={(event) => {
                setCurrentStep((prev) => Math.min(prev + 1, 5));
              }}
              className="bg-[#7B00FF] text-primary-foreground"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
