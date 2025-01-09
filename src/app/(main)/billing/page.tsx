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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CreditCard,
  Check,
  Star,
  Zap,
  Shield,
  Clock,
  Users,
  Crown,
  Download,
  ArrowRight,
} from "lucide-react";

export default function BillingPage() {
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      description: "For individuals starting their journey",
      price: yearlyBilling ? 79 * 12 * 0.8 : 79,
      features: [
        "40 sessions/month",
        "Basic analytics",
        "Email support",
        "Chat history - 30 days",
      ],
    },
    {
      name: "Symphony",
      icon: <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />,
      description: "For dedicated therapy seekers",
      price: yearlyBilling ? 149 * 12 * 0.8 : 149,
      features: [
        "99 sessions/month",
        "Advanced analytics",
        "Priority support",
        "Chat history - 90 days",
        "Custom session goals",
      ],
      current: true,
    },
    {
      name: "Professional",
      icon: <Shield className="h-5 w-5 text-violet-500" />,
      description: "For intensive therapy needs",
      price: yearlyBilling ? 249 * 12 * 0.8 : 249,
      features: [
        "Unlimited sessions",
        "Professional analytics",
        "24/7 priority support",
        "Unlimited chat history",
        "Advanced customization",
        "Progress tracking",
      ],
    },
    {
      name: "Enterprise",
      icon: <Crown className="h-5 w-5 text-orange-500" />,
      description: "For organizations & teams",
      price: "Custom",
      features: [
        "Custom user limits",
        "Enterprise analytics",
        "Dedicated support team",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
        "Custom contracts",
      ],
    },
  ];

  const paymentLogs = [
    { date: "2025-01-10", amount: 149, status: "Paid", invoice: "INV-001" },
    { date: "2024-12-10", amount: 149, status: "Paid", invoice: "INV-002" },
    { date: "2024-11-10", amount: 149, status: "Paid", invoice: "INV-003" },
    { date: "2024-10-10", amount: 149, status: "Paid", invoice: "INV-004" },
    { date: "2024-09-10", amount: 149, status: "Paid", invoice: "INV-005" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Current Plan Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Billing & Subscription</h1>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoices
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Download Invoices</DialogTitle>
                  <DialogDescription>
                    Select the invoice you want to download.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentLogs.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.invoice}</TableCell>
                          <TableCell>${log.amount}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button variant="default">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Billing
            </Button>
          </div>
        </div>

        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">Symphony Plan</CardTitle>
                  <Badge variant="default" className="bg-primary">
                    Active
                  </Badge>
                </div>
                <CardDescription className="mt-1">
                  Professional therapy sessions with advanced features
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$149</span>
                <span className="text-muted-foreground">/month</span>
                <Badge variant="secondary" className="ml-2">
                  37/99 Sessions Used
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>37 sessions used</span>
                <span>62 sessions remaining</span>
              </div>
              <Progress value={37} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                Next reset: Feb 10, 2025
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Users className="h-4 w-4 text-primary" />,
                  title: "Sessions",
                  value: "12",
                  subtext: "Used this month",
                },
                {
                  icon: <Clock className="h-4 w-4 text-primary" />,
                  title: "Next Billing",
                  value: "Feb 10",
                  subtext: "$149/month",
                },
                {
                  icon: <Shield className="h-4 w-4 text-primary" />,
                  title: "Status",
                  value: "Active",
                  subtext: "Auto-renewal on",
                  valueColor: "text-green-500",
                },
                {
                  icon: <Star className="h-4 w-4 text-primary" />,
                  title: "Perks",
                  value: "4/4",
                  subtext: "Features active",
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
                      {item.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.subtext}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Dialog open={showPlanDetails} onOpenChange={setShowPlanDetails}>
              <DialogTrigger asChild>
                <Button variant="link" className="w-full">
                  View Plan Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Symphony Plan Details</DialogTitle>
                  <DialogDescription>
                    Your current plan features and benefits.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {plans
                    .find((p) => p.current)
                    ?.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
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
                plan.current ? "border-2 border-primary" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {plan.icon}
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  {plan.current && (
                    <Badge variant="default" className="bg-primary">
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    $
                    {typeof plan.price === "number"
                      ? plan.price.toFixed(2)
                      : plan.price}
                  </span>
                  {typeof plan.price === "number" && (
                    <span className="text-muted-foreground">
                      /{yearlyBilling ? "year" : "month"}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={plan.current ? "default" : "outline"}
                  className="w-full"
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

      {/* Payment Method Section */}
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
      </section>

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
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>${log.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.status === "Paid" ? "default" : "destructive"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.invoice}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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
