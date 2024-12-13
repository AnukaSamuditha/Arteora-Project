"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};


function getLastSixMonths() {
  const months = [];
  const today = new Date();

  for (let i = 0; i < 6; i++) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = month.toLocaleString("default", { month: "long" });
    months.unshift(monthName); 
  }

  return months;
}

export function OrderBarchart({ orders = 0 }) {
  const currentMonthName = new Date().toLocaleString("default", { month: "long" });
  const months = getLastSixMonths();

  
  const chartData = months.map((month) => ({
    month,
    desktop: month === currentMonthName ? orders : 0,
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Order Analysis</CardTitle>
        <CardDescription>Past 6 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#0071e3" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total orders for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
