import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants=cva("inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-[#111827] text-white hover:bg-[#28303d]",accent:"bg-[#ff5c35] text-white hover:bg-[#e74d29]",outline:"border border-black/10 bg-white text-[#111827] hover:border-black/30"},size:{default:"h-12 px-6",sm:"h-10 px-5",lg:"h-14 px-8 text-base",icon:"h-11 w-11"}},defaultVariants:{variant:"default",size:"default"}});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{asChild?:boolean}
const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{const Comp=asChild?Slot:"button";return <Comp className={cn(buttonVariants({variant,size,className}))} ref={ref} {...props}/>});Button.displayName="Button";
export {Button,buttonVariants};
