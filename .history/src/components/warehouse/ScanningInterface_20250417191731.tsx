import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Loader2,
  Scan,
  MoveHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScanningInterfaceProps {
  onComplete?: (data: ScanData) => void;
  defaultLocation?: string;
}

interface ScanData {
  currentLocation: string;
  assetId: string;
  destinationLocation: string;
  moveType: MoveType;
}

type ScanStep = "current" | "asset" | "destination" | "confirm" | "complete";
type MoveType =
  | "pallet-to-zone"
  | "asset-to-pallet"
  | "bin-to-bin"
  | "initial-bin";

const ScanningInterface: React.FC<ScanningInterfaceProps> = ({
  onComplete = () => {},
  defaultLocation = "",
}) => {
  const [currentStep, setCurrentStep] = useState<ScanStep>("current");
  const [scanData, setScanData] = useState<ScanData>({
    currentLocation: defaultLocation,
    assetId: "",
    destinationLocation: "",
    moveType: "pallet-to-zone",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field when the component mounts or when the step changes
  useEffect(() => {
    if (
      inputRef.current &&
      currentStep !== "complete" &&
      currentStep !== "confirm"
    ) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const handleScan = (value: string) => {
    setError("");
    setSuccess("");
    setIsProcessing(true);

    // Simulate API validation with a timeout
    setTimeout(() => {
      setIsProcessing(false);

      // Validate scan based on current step
      if (validateScan(value)) {
        updateScanData(value);
        moveToNextStep();
        setSuccess(`Successfully scanned ${getScanTypeLabel()}.`);
      } else {
        setError(`Invalid ${getScanTypeLabel()} scan. Please try again.`);
      }
    }, 500);
  };

  const validateScan = (value: string): boolean => {
    // Mock validation - in a real app, this would validate against an API
    // For this scaffold, we'll accept any non-empty value
    return value.trim().length > 0;
  };

  const updateScanData = (value: string) => {
    setScanData((prev) => {
      switch (currentStep) {
        case "current":
          return { ...prev, currentLocation: value };
        case "asset":
          return { ...prev, assetId: value };
        case "destination":
          return { ...prev, destinationLocation: value };
        default:
          return prev;
      }
    });
  };

  const moveToNextStep = () => {
    switch (currentStep) {
      case "current":
        setCurrentStep("asset");
        break;
      case "asset":
        setCurrentStep("destination");
        break;
      case "destination":
        setCurrentStep("confirm");
        break;
      case "confirm":
        setCurrentStep("complete");
        onComplete(scanData);
        break;
    }
  };

  const getScanTypeLabel = (): string => {
    switch (currentStep) {
      case "current":
        return "current bin location";
      case "asset":
        return scanData.moveType === "asset-to-pallet"
          ? "asset tag/serial number"
          : "pallet number";
      case "destination":
        return scanData.moveType === "initial-bin"
          ? "initial bin location"
          : "destination bin location";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear any previous messages
    setError("");
    setSuccess("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isProcessing) {
      const value = e.currentTarget.value.trim();
      if (value) {
        handleScan(value);
        e.currentTarget.value = "";
      } else {
        setError(`Please scan a ${getScanTypeLabel()}.`);
      }
    }
  };

  const handleMoveTypeChange = (value: MoveType) => {
    setScanData((prev) => ({ ...prev, moveType: value }));
  };

  const handleConfirmMove = () => {
    setIsProcessing(true);

    // Simulate API call to process the move
    setTimeout(() => {
      setIsProcessing(false);
      moveToNextStep();
    }, 1000);
  };

  const resetScan = () => {
    setScanData({
      currentLocation: "",
      assetId: "",
      destinationLocation: "",
      moveType: "pallet-to-zone",
    });
    setCurrentStep("current");
    setError("");
    setSuccess("");
  };

  const getMoveTypeLabel = (moveType: MoveType): string => {
    switch (moveType) {
      case "pallet-to-zone":
        return "Pallet to Zone";
      case "asset-to-pallet":
        return "Asset to Pallet";
      case "bin-to-bin":
        return "Bin to Bin Transfer";
      case "initial-bin":
        return "Initial Bin Assignment";
      default:
        return "";
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "current" ? "bg-primary text-primary-foreground" : currentStep === "asset" || currentStep === "destination" || currentStep === "confirm" || currentStep === "complete" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
          >
            {currentStep === "current" ? (
              "1"
            ) : (
              <CheckCircle className="w-6 h-6" />
            )}
          </div>
          <span className="text-xs mt-1">Current Bin</span>
        </div>

        <div className="flex-1 h-px bg-muted mx-2"></div>

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "asset" ? "bg-primary text-primary-foreground" : currentStep === "destination" || currentStep === "confirm" || currentStep === "complete" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
          >
            {currentStep === "asset" ? (
              "2"
            ) : currentStep === "destination" ||
              currentStep === "confirm" ||
              currentStep === "complete" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              "2"
            )}
          </div>
          <span className="text-xs mt-1">
            {scanData.moveType === "asset-to-pallet"
              ? "Asset/Serial"
              : "Pallet No."}
          </span>
        </div>

        <div className="flex-1 h-px bg-muted mx-2"></div>

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "destination" ? "bg-primary text-primary-foreground" : currentStep === "confirm" || currentStep === "complete" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
          >
            {currentStep === "destination" ? (
              "3"
            ) : currentStep === "confirm" || currentStep === "complete" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              "3"
            )}
          </div>
          <span className="text-xs mt-1">Destination Bin</span>
        </div>

        <div className="flex-1 h-px bg-muted mx-2"></div>

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "confirm" ? "bg-primary text-primary-foreground" : currentStep === "complete" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
          >
            {currentStep === "confirm" ? (
              "4"
            ) : currentStep === "complete" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              "4"
            )}
          </div>
          <span className="text-xs mt-1">Confirm</span>
        </div>
      </div>
    );
  };

  const renderMoveTypeSelector = () => {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Select Move Type:</h3>
        <Select
          value={scanData.moveType}
          onValueChange={(value) => handleMoveTypeChange(value as MoveType)}
          disabled={currentStep !== "current" || isProcessing}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select move type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pallet-to-zone">Pallet to Zone</SelectItem>
            <SelectItem value="asset-to-pallet">Asset to Pallet</SelectItem>
            <SelectItem value="bin-to-bin">Bin to Bin Transfer</SelectItem>
            <SelectItem value="initial-bin">Initial Bin Assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  const renderScanInput = () => {
    if (currentStep === "complete" || currentStep === "confirm") return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2 text-sm py-1.5">
            Step{" "}
            {currentStep === "current"
              ? "1"
              : currentStep === "asset"
                ? "2"
                : "3"}
          </Badge>
          <h3 className="text-lg font-medium">Scan {getScanTypeLabel()}</h3>
        </div>

        <div className="relative">
          <Input
            ref={inputRef}
            className="h-14 pl-12 text-lg font-medium"
            placeholder={`Scan ${getScanTypeLabel()} barcode...`}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            disabled={isProcessing}
          />
          <Scan className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          {isProcessing && (
            <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin" />
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mt-2">
            <XCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mt-2 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  const renderConfirmStep = () => {
    if (currentStep !== "confirm") return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2 text-sm py-1.5">
            Step 4
          </Badge>
          <h3 className="text-lg font-medium">Confirm Move</h3>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Move Type:</h4>
            <Badge variant="secondary" className="text-sm">
              {getMoveTypeLabel(scanData.moveType)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">From:</span>
              <span className="font-medium">{scanData.currentLocation}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {scanData.moveType === "asset-to-pallet"
                  ? "Asset/Serial:"
                  : "Pallet No.:"}
              </span>
              <span className="font-medium">{scanData.assetId}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">To:</span>
              <span className="font-medium">
                {scanData.destinationLocation}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleConfirmMove}
            disabled={isProcessing}
            className="w-full py-6"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <MoveHorizontal className="mr-2 h-5 w-5" />
                Confirm Move
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderScanSummary = () => {
    if (currentStep === "complete") return null;

    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Scan Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Current Bin Location
            </p>
            <p className="font-medium">{scanData.currentLocation || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {scanData.moveType === "asset-to-pallet"
                ? "Asset/Serial No."
                : "Pallet No."}
            </p>
            <p className="font-medium">{scanData.assetId || "-"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Destination Bin Location
            </p>
            <p className="font-medium">{scanData.destinationLocation || "-"}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCompletionMessage = () => {
    if (currentStep !== "complete") return null;

    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Move Completed Successfully
        </h3>
        <p className="text-muted-foreground mb-6">
          {scanData.moveType === "pallet-to-zone" &&
            "The pallet has been successfully moved to the new zone."}
          {scanData.moveType === "asset-to-pallet" &&
            "The asset has been successfully assigned to the pallet."}
          {scanData.moveType === "bin-to-bin" &&
            "The item has been successfully transferred between bins."}
          {scanData.moveType === "initial-bin" &&
            "The initial bin location has been successfully assigned."}
        </p>
        <div className="bg-muted/30 p-4 rounded-lg border mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Move Type:</span>
              <Badge variant="secondary" className="text-sm">
                {getMoveTypeLabel(scanData.moveType)}
              </Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">From:</span>
              <span className="font-medium">{scanData.currentLocation}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {scanData.moveType === "asset-to-pallet"
                  ? "Asset/Serial:"
                  : "Pallet No.:"}
              </span>
              <span className="font-medium">{scanData.assetId}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">To:</span>
              <span className="font-medium">
                {scanData.destinationLocation}
              </span>
            </div>
          </div>
        </div>
        <Button onClick={resetScan}>Scan Another Item</Button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      <Card>
        <CardHeader>
          <CardTitle>Skid-Pallet-Asset to Location Scanning</CardTitle>
          <CardDescription>
            Scan barcodes to move items between warehouse locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderMoveTypeSelector()}
          {renderStepIndicator()}
          {renderScanInput()}
          {renderConfirmStep()}
          {renderScanSummary()}
          {renderCompletionMessage()}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={resetScan}
            disabled={currentStep === "current" && !scanData.currentLocation}
          >
            Reset
          </Button>
          {currentStep !== "complete" && currentStep !== "confirm" && (
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Press Enter after scanning</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScanningInterface;

import React from "react";
import ScanningInterface from "./ScanningInterface";

const ScanningPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <ScanningInterface />
    </div>
  );
};

export default ScanningPage;
