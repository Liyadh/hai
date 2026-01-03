
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ScheduleTripDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: (trip: any) => void;
}

export function ScheduleTripDialog({ open, onClose, onCreated }: ScheduleTripDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you'd get the new trip data from the form
      const newTripData = {
        bus: "AP01AG3333",
        route: "New Route -> College",
        // ... other form data
      };
      onCreated(newTripData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule New Trip</DialogTitle>
          <DialogDescription>
            Select a bus, route, and time to schedule a new trip.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="bus">Bus</Label>
                    <Select>
                        <SelectTrigger id="bus"><SelectValue placeholder="Select an active bus" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="AP01AB1234">AP01AB1234</SelectItem>
                            <SelectItem value="AP01AB5678">AP01AB5678</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="route">Route</Label>
                    <Select>
                        <SelectTrigger id="route"><SelectValue placeholder="Select a route" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gudur-main">Gudur Main</SelectItem>
                            <SelectItem value="rural-area">Rural Area</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="trip-date">Trip Date</Label>
                    <Input id="trip-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                 </div>
                 <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" defaultValue="06:30" />
                 </div>
            </div>
            <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input id="notes" placeholder="e.g., Extra stop for sports students" />
            </div>
            
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Schedule Trip
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


    