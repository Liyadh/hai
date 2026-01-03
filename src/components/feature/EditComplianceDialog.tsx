
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const complianceDocumentSchema = z.object({
  number: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

const complianceFormSchema = z.object({
  FitnessCertificate: complianceDocumentSchema,
  Insurance: complianceDocumentSchema,
  PUC: complianceDocumentSchema,
  Permit: complianceDocumentSchema,
  Tax: complianceDocumentSchema,
});

type ComplianceFormValues = z.infer<typeof complianceFormSchema>;

type ComplianceDocument = {
  name: string;
  certNo?: string;
  issueDate?: string;
  validTill?: string;
  file?: string;
  [key: string]: any;
};

interface EditComplianceDialogProps {
  open: boolean;
  onClose: () => void;
  busId: string;
  compliance: ComplianceDocument[];
  onUpdated: (updatedCompliance: any) => void;
}

const complianceTypes = [
  { id: "FitnessCertificate", name: "Fitness Certificate (FC)" },
  { id: "Insurance", name: "Insurance Policy" },
  { id: "PUC", name: "Pollution Certificate (PUC)" },
  { id: "Permit", name: "Route Permit" },
  { id: "Tax", name: "Tax Receipt" },
];

// Helper to convert DD/MM/YYYY to YYYY-MM-DD
const parseDate = (dateString: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        return ''; // Return empty if format is not DD/MM/YYYY
    }
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

export function EditComplianceDialog({ open, onClose, busId, compliance, onUpdated }: EditComplianceDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComplianceFormValues>({
    resolver: zodResolver(complianceFormSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    if (compliance) {
      const defaultVals = compliance.reduce((acc, doc) => {
        const key = complianceTypes.find(ct => ct.name === doc.name)?.id;
        if (key) {
          (acc as any)[key] = {
            number: doc.certNo,
            issueDate: doc.issueDate ? parseDate(doc.issueDate) : '',
            expiryDate: doc.validTill ? parseDate(doc.validTill) : '',
          };
        }
        return acc;
      }, {} as ComplianceFormValues);
      reset(defaultVals);
    }
  }, [compliance, reset, open]);
  
  const [selectedFiles, setSelectedFiles] = React.useState<Record<string, File | null>>({});

  const handleFileChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFiles(prev => ({ ...prev, [type]: file }));
  };

  const onSubmit = async (values: ComplianceFormValues) => {
    console.log("Form values:", values);
    console.log("Selected files:", selectedFiles);
    // Here you would handle file uploads and then call the onUpdated prop.
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUpdated(values);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Compliance Documents</DialogTitle>
          <DialogDescription>
            Update certificate numbers, dates, and upload new document files for Bus ID: {busId}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] overflow-y-auto p-1 space-y-8">
          {complianceTypes.map(docType => {
            const currentDoc = compliance.find(d => d.name === docType.name);
            return (
              <section key={docType.id} className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold text-lg">{docType.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor={`${docType.id}.number`}>Certificate Number</Label>
                    <Input id={`${docType.id}.number`} {...register(`${docType.id}.number` as keyof ComplianceFormValues)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`${docType.id}.issueDate`}>Issue Date</Label>
                    <Input id={`${docType.id}.issueDate`} type="date" {...register(`${docType.id}.issueDate` as keyof ComplianceFormValues)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`${docType.id}.expiryDate`}>Expiry Date</Label>
                    <Input id={`${docType.id}.expiryDate`} type="date" {...register(`${docType.id}.expiryDate` as keyof ComplianceFormValues)} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Label className="cursor-pointer">
                      <UploadCloud className="mr-2 h-4 w-4" />
                      {selectedFiles[docType.id] ? "Change File" : "Upload File"}
                      <input type="file" hidden onChange={handleFileChange(docType.id)} accept="application/pdf,image/*" />
                    </Label>
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    {selectedFiles[docType.id]
                      ? `Selected: ${selectedFiles[docType.id]?.name}`
                      : currentDoc?.file
                      ? `Current: ${currentDoc.file}`
                      : "No file uploaded."}
                  </div>
                </div>
              </section>
            )
          })}
          <DialogFooter className="sticky bottom-0 bg-background pt-4">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
