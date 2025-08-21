import React from "react";
import { formatNumber } from "../../utils";
import { X, Loader2, CheckCircle2, XCircle, Zap, Clock, AlertCircle } from "lucide-react";

const TransactionModal = ({ isOpen, onClose, summary, progress }) => {
  const {
    isProcessing,
    isComplete,
    hasError,
    step: currentStep,
    batch: currentBatch,
    tx: currentTx,
    stepStatus,
    failedBatches,
    skippedBatches,
    successfulTxs,
    failedTxs,
  } = progress;

  // prettier-ignore
  const steps = [
    { id: "fetching", title: "Fetching Transactions", description: "Retrieving transaction batches from server...", icon: Loader2, color: "blue" },
    { id: "processing", title: "Processing Batches", description: "Simulating, signing, and sending transactions...", icon: Zap, color: "purple" },
    { id: "confirming", title: "Confirming Transactions", description: "Waiting for on-chain confirmation...", icon: Clock, color: "orange" },
    { id: "complete", title: "Complete", description: "All transactions processed successfully!", icon: CheckCircle2, color: "green" },
  ];

  const batchTypes = ["Close Only", "Burn Only", "Close After Burn"];

  const getStepIcon = (step, index) => {
    const Icon = step.icon;
    const status = stepStatus[step.id];

    if (index < currentStep) {
      return status === "failed" ? (
        <XCircle className="w-5 h-5 text-red-400" />
      ) : status === "warning" ? (
        <AlertCircle className="w-5 h-5 text-yellow-400" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-green-400" />
      );
    } else if (index === currentStep && isProcessing) {
      return <Icon className="w-5 h-5 text-blue-400 animate-spin" />;
    } else {
      return <Icon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStepStatus = (step, index) => {
    if (index < currentStep) {
      const status = stepStatus[step.id];
      return status === "failed" ? "Failed" : status === "warning" ? "Completed with warnings" : "Completed";
    } else if (index === currentStep && isProcessing) {
      return "In Progress...";
    } else {
      return "Pending";
    }
  };

  const getCurrentStepDetails = () => {
    switch (currentStep) {
      case 0:
        return "Fetching transactions from server...";
      case 1:
        if (batchTypes.length > 0) {
          const batchType = batchTypes[currentBatch];
          const isSkipped = skippedBatches.includes(currentBatch);
          if (isSkipped) {
            return `Skipping ${batchType} batch due to error...`;
          }
          return `Processing ${batchType} batch - Transaction ${currentTx}`;
        }
        return "Processing transactions...";
      case 2:
        return `Confirming transaction ${currentTx} of ${successfulTxs}...`;
      case 3:
        if (hasError) {
          return `Completed with ${successfulTxs} successful and ${failedTxs} failed transactions`;
        }
        return "All transactions completed successfully!";
      default:
        return "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">Processing Transactions</h2>
            <p className="text-gray-400 text-sm">
              {summary.zeroCount + summary.burnCount} accounts • {formatNumber(summary.totalRent)} SOL
            </p>
          </div>
          {!isProcessing && (
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index < currentStep
                      ? "border-green-500 bg-green-500/20"
                      : index === currentStep && isProcessing
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-gray-600 bg-gray-800/50"
                  }`}
                >
                  {getStepIcon(step, index)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${index <= currentStep ? "text-white" : "text-gray-500"}`}>{step.title}</h3>
                    <span
                      className={`text-sm ${
                        index < currentStep
                          ? "text-green-400"
                          : index === currentStep && isProcessing
                          ? "text-blue-400"
                          : "text-gray-500"
                      }`}
                    >
                      {getStepStatus(step, index)}
                    </span>
                  </div>
                  <p className={`text-sm ${index <= currentStep ? "text-gray-300" : "text-gray-600"}`}>
                    {index === currentStep && isProcessing ? getCurrentStepDetails() : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Transaction Details */}
          {currentStep === 1 && batchTypes.length > 0 && (
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <h4 className="text-white font-semibold mb-3">Batch Processing</h4>
              <div className="space-y-2">
                {batchTypes.map((batchType, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      index === currentBatch
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : skippedBatches.includes(index)
                        ? "bg-red-500/20 border border-red-500/30"
                        : index < currentBatch
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-gray-700/30"
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        index === currentBatch
                          ? "text-blue-300"
                          : skippedBatches.includes(index)
                          ? "text-red-300"
                          : index < currentBatch
                          ? "text-green-300"
                          : "text-gray-400"
                      }`}
                    >
                      {batchType}
                    </span>
                    {skippedBatches.includes(index) && <XCircle className="w-4 h-4 text-red-400" />}
                    {index < currentBatch && !skippedBatches.includes(index) && (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    )}
                    {index === currentBatch && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                  </div>
                ))}
              </div>

              {/* Error Summary during processing */}
              {(failedTxs > 0 || failedBatches.length > 0) && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 font-medium text-sm">Processing Issues</span>
                  </div>
                  <div className="text-xs text-yellow-200 space-y-1">
                    {failedTxs > 0 && <div>• {failedTxs} transactions failed</div>}
                    {failedBatches.length > 0 && <div>• {failedBatches.length} batches skipped</div>}
                    <div className="text-yellow-300">• Continuing with remaining transactions...</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Completion Summary */}
          {isComplete && (
            <div
              className={`${
                hasError
                  ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                  : "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              } rounded-xl p-6 text-center`}
            >
              {hasError ? (
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              ) : (
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              )}

              <h3 className="text-xl font-bold text-white mb-2">
                {hasError ? "Processing Complete with Issues ⚠️" : "Transaction Complete! 🎉"}
              </h3>

              <div className="mb-4 space-y-2">
                <p className="text-green-300">✅ {successfulTxs} transactions successful</p>
                {failedTxs > 0 && <p className="text-red-300">❌ {failedTxs} transactions failed</p>}
                {failedBatches.length > 0 && <p className="text-yellow-300">⏭️ {failedBatches.length} batches skipped</p>}
              </div>

              <div className={`${hasError ? "bg-yellow-500/10" : "bg-green-500/10"} rounded-lg p-4 mb-4`}>
                <div className={`text-2xl font-bold ${hasError ? "text-yellow-400" : "text-green-400"}`}>
                  +{formatNumber(summary.totalRent * (successfulTxs / (successfulTxs + failedTxs)))} SOL
                </div>
                <div className={`text-sm ${hasError ? "text-yellow-300" : "text-green-300"}`}>
                  {hasError ? "Partially reclaimed to your wallet" : "Reclaimed to your wallet"}
                </div>
              </div>

              {/* Error Details */}
              {failedBatches.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-left">
                  <h4 className="text-red-300 font-semibold mb-2 text-sm">Failed Batches:</h4>
                  <div className="space-y-1">
                    {failedBatches.map((batch, index) => (
                      <div key={index} className="text-xs text-red-200">
                        • {batch.type}: {batch.reason}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {isComplete && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className={`flex-1 ${
                  hasError
                    ? "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                } text-white font-bold py-3 px-6 rounded-xl transition-all duration-300`}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
