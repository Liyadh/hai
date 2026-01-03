
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
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const stopSchema = z.object({
  name: z.string().min(1, "Stop name is required."),
});

const routeSchema = z.object({
  name: z.string().min(3, "Route name must be at least 3 characters long."),
  status: z.enum(["Active", "Scheduled", "Inactive"]),
  stops: z.array(stopSchema).min(2, "At least two stops are required."),
  estimatedDistanceKm: z.coerce.number().optional(),
  estimatedDurationMin: z.coerce.number().optional(),
});

type RouteFormValues = z.infer<typeof routeSchema>;

type Stop = {
    id: number;
    name: string;
    distance: string;
    cumulative: string;
    time: string;
    wait: string;
}

type NewRouteData = {
    name: string;
    status: "Active" | "Scheduled" | "Inactive";
    stops: number;
    distance?: string;
    duration?: string;
    stopDetails: Pick<Stop, 'name'>[];
}

interface NewRouteDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: (route: NewRouteData) => void;
}

export function NewRouteDialog({ open, onClose, onCreated }: NewRouteDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RouteFormValues>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      name: "",
      status: "Active",
      stops: [{ name: "" }, { name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stops",
  });

  const onSubmit = (data: RouteFormValues) => {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            const newRoute: NewRouteData = {
                name: data.name,
                status: data.status,
                stops: data.stops.length,
                distance: data.estimatedDistanceKm ? `${data.estimatedDistanceKm} km` : undefined,
                duration: data.estimatedDurationMin ? `${data.estimatedDurationMin} min` : undefined,
                stopDetails: data.stops.map(s => ({ name: s.name })),
            };
            onCreated(newRoute);
            reset();
            resolve(true);
        }, 1000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Route</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new bus route. You can assign buses and refine timings later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[70vh] overflow-y-auto p-1">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Route Name</Label>
              <Input id="name" {...register("name")} placeholder="e.g., Gudur Main → College" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Stops</h3>
            <p className="text-sm text-muted-foreground">Add at least two stops for the route.</p>
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">{index + 1}.</span>
                <Input
                  {...register(`stops.${index}.name`)}
                  placeholder={`Stop ${index + 1} Name`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 2}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
             {errors.stops && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.stops.message || (errors.stops as any)?.root?.message}
                </p>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "" })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Stop
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <Label htmlFor="estimatedDistanceKm">Estimated Distance (km)</Label>
                <Input id="estimatedDistanceKm" type="number" {...register("estimatedDistanceKm")} placeholder="e.g., 28.5" />
                {errors.estimatedDistanceKm && <p className="text-red-500 text-sm mt-1">{errors.estimatedDistanceKm.message}</p>}
            </div>
             <div>
                <Label htmlFor="estimatedDurationMin">Estimated Duration (min)</Label>
                <Input id="estimatedDurationMin" type="number" {...register("estimatedDurationMin")} placeholder="e.g., 75" />
                {errors.estimatedDurationMin && <p className="text-red-500 text-sm mt-1">{errors.estimatedDurationMin.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Route
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
