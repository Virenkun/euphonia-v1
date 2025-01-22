"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Star, Zap, Shield, Clock, Users, Crown, Check } from "lucide-react";
import { UUIDTypes } from "uuid";
import { formatDate, formatDateReadble } from "@/utils/formatters";
import { fetchModuleAccess, getNextBillingInfo } from "@/utils/utils-functions";

type Plan = {
  description: string;
  duration: string;
  name: string;
  price: number;
  features: {
    sessions: number;
    dashboardAccess: boolean;
    chatHistoryAccess: boolean;
    aiResourceAccess: boolean;
    professionalTherapistAccess: boolean;
    aiCheckInAccess: boolean;
  };
};

interface BillingPageProps {
  currentPlan: Plan;
  sessionUsed: number;
  allPlans: Plan[];
  paymentList: PaymentList[];
}

type PaymentList = {
  card: Card;
  currency: string;
  method: string;
  amount: string;
  status: string;
  notes: PaymentNotes;
  created_at: string;
  is_current: boolean;
};

type Card = {
  last4: string;
  network: string;
  type: string;
  issuer: string;
  international: string;
  emi: string;
  sub_type: string;
};

type PaymentNotes = {
  authId: UUIDTypes;
  product: string;
  productId: string;
  productName: string;
};

export default function BillingPage({
  currentPlan,
  sessionUsed,
  allPlans,
  paymentList,
}: BillingPageProps) {
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const { nextBillingDate, daysRemaining } = getNextBillingInfo(
    paymentList.filter((item) => item.is_current)[0].created_at
  );
  const GetIcons = (planname: string) => {
    switch (planname) {
      case "Harmonic":
        return <Zap className="h-5 w-5 text-blue-500" />;
      case "Melody":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "Symphony":
        return <Shield className="h-5 w-5 text-violet-500" />;
      case "Serenade":
        return <Crown className="h-5 w-5 text-orange-500" />;
    }
  };
  const plans = allPlans.map((plan) => ({
    ...plan,
    icon: GetIcons(plan.name),
    current: plan.name === currentPlan.name,
  }));

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Current Plan Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Billing & Subscription</h1>
          <div className="flex gap-4"></div>
        </div>

        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">
                    {currentPlan?.name} Plan
                  </CardTitle>
                  <Badge
                    variant="default"
                    className="bg-[#4B4ACF]  hover:bg-[#4B4ACF]"
                  >
                    Active
                  </Badge>
                </div>
                <CardDescription className="mt-1">
                  {currentPlan?.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  ${currentPlan?.price}
                </span>
                <span className="text-muted-foreground">/month</span>
                <Badge variant="secondary" className="ml-2">
                  {sessionUsed}/{currentPlan?.features?.sessions} Sessions Used
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{sessionUsed} sessions used</span>
                <span>
                  {currentPlan?.features?.sessions - sessionUsed} sessions
                  remaining
                </span>
              </div>
              <Progress value={37} className="h-2" />
              {/* <p className="text-xs text-muted-foreground text-right">
                Next reset: Feb 10, 2025
              </p> */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Users className="h-4 w-4 text-primary" />,
                  title: "Sessions",
                  value: { sessionUsed },
                  subtext: "Used",
                },
                {
                  icon: <Clock className="h-4 w-4 text-primary" />,
                  title: "Next Billing",
                  value: (
                    <div className="text-xl">
                      {daysRemaining}{" "}
                      <span className="text-sm font-normal">
                        days remaining
                      </span>
                    </div>
                  ),
                  subtext: `Next billing on ${
                    formatDate(nextBillingDate)?.split(",")[0]
                  }`,
                },
                {
                  icon: <Shield className="h-4 w-4 text-primary" />,
                  title: "Status",
                  value: "Active",
                  valueColor: "text-green-500",
                },
                {
                  icon: <Star className="h-4 w-4 text-primary" />,
                  title: "Features Access",
                  value: (
                    <div className="font-bold">
                      {fetchModuleAccess(currentPlan?.features).length}/6
                      <div>
                        <Dialog
                          open={showPlanDetails}
                          onOpenChange={setShowPlanDetails}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="link"
                              className="w-full underline text-blue-600"
                            >
                              View Features Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                {currentPlan?.name} Plan Details
                              </DialogTitle>
                              <DialogDescription>
                                Your current plan features and benefits.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              {fetchModuleAccess(currentPlan?.features).map(
                                (feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 font-medium"
                                  >
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span>{feature.name}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ),
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    {item.icon}
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-2xl font-bold ${item.valueColor || ""}`}
                    >
                      {typeof item.value === "object" &&
                      "sessionUsed" in item.value
                        ? item.value.sessionUsed
                        : item.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.subtext}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Plans Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold">Available Plans</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="yearly-billing"
              checked={yearlyBilling}
              onCheckedChange={setYearlyBilling}
            />
            <Label htmlFor="yearly-billing">Yearly Billing (Save 20%)</Label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                plan.current ? "border-2 border-[#4B4ACF]" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {plan.icon}
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  {plan.current && (
                    <Badge variant="default" className="bg-[#4B4ACF]">
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold">Free</span>
                  ) : (
                    <>
                      {" "}
                      <span className="text-3xl font-bold">
                        $
                        {typeof plan.price === "number"
                          ? yearlyBilling
                            ? parseFloat((plan.price * 12 * 0.8).toFixed(2))
                            : parseFloat(plan.price.toFixed(2))
                          : yearlyBilling
                          ? (plan.price * 12 * 0.8).toFixed(2)
                          : plan.price}
                      </span>
                      {typeof plan.price === "number" && (
                        <span className="text-muted-foreground">
                          /{yearlyBilling ? "year" : "month"}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {/* {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))} */}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={plan.current ? "default" : "outline"}
                  className={plan.current ? "w-full" : "w-full"}
                >
                  {plan.current
                    ? "Current Plan"
                    : plan.name === "Enterprise"
                    ? "Contact Sales"
                    : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Method Section
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Visa ending in 4242
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Expires 12/25</p>
              <Badge className="mt-2">Default</Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                Remove
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Mastercard ending in 5555
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Expires 09/24</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                Set as Default
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                Remove
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Add Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Add New Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* Payment Logs Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Payment History</h2>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentList.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDateReadble(log.created_at)}</TableCell>
                    <TableCell>
                      ${(Number(log.amount) / 100).toFixed(2)}
                    </TableCell>

                    <TableCell>{log.notes.productName}</TableCell>
                    <TableCell>{log.method}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "captured" ? "default" : "destructive"
                        }
                        className="bg-green-600"
                      >
                        {log.status === "captured" ? "Success" : "Failed"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
