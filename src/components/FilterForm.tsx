"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "Design", label: "Design" },
  { value: "Development", label: "Development" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
];
const complexityLevels = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];
const targetAudience = [
  { value: "Students", label: "Students" },
  { value: "Professionals", label: "Professionals" },
  { value: "Startups", label: "Startups" },
  { value: "Media", label: "Media" },
];

const FormSchema = z.object({
  category: z.string({
    required_error: "Please select a category to display.",
  }),
  complexity: z.string({
    required_error: "Please select a complexity level to display.",
  }),
  audience: z.string({
    required_error: "Please select a complexity level to display.",
  }),
});

export function FilterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form Data:", data);
  }

  function handleClear() {
    form.reset();
    console.log("Filters Cleared");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-10 space-y-6"
      >
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl dark:text-white font-medium">Filters</p>
          <Button
            className="flex justify-start gap-2 items-center text-zinc-400"
            variant={"outline"}
            onClick={handleClear}
            type="button"
          >
            <span>X</span>Clear Filter
          </Button>
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complexity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select comlexity level..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {complexityLevels.map((comlexity) => (
                    <SelectItem key={comlexity.value} value={comlexity.value}>
                      {comlexity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="audience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {targetAudience.map((audience) => (
                    <SelectItem key={audience.value} value={audience.value}>
                      {audience.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Generate Project Ideas
        </Button>
      </form>
    </Form>
  );
}
