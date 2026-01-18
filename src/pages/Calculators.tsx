import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, IndianRupee, Percent, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Calculators() {
  return (
    <Layout
      title="Tax Calculators"
      subtitle="Tools for tax computations and penalty estimations"
    >
      <Tabs defaultValue="income-tax" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
          <TabsTrigger value="gst">GST</TabsTrigger>
        </TabsList>

        <TabsContent value="income-tax" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <IncomeTaxCalculator />
            <InterestCalculator />
          </div>
        </TabsContent>

        <TabsContent value="gst" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <GSTLateFeeCalculator />
            <TDSCalculator />
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [result, setResult] = useState<{
    tax: number;
    cess: number;
    total: number;
  } | null>(null);

  const calculateTax = () => {
    const incomeNum = parseFloat(income) || 0;
    let tax = 0;

    if (regime === "new") {
      // New Regime FY 2025-26
      if (incomeNum <= 300000) tax = 0;
      else if (incomeNum <= 700000) tax = (incomeNum - 300000) * 0.05;
      else if (incomeNum <= 1000000)
        tax = 20000 + (incomeNum - 700000) * 0.1;
      else if (incomeNum <= 1200000)
        tax = 50000 + (incomeNum - 1000000) * 0.15;
      else if (incomeNum <= 1500000)
        tax = 80000 + (incomeNum - 1200000) * 0.2;
      else tax = 140000 + (incomeNum - 1500000) * 0.3;

      // Rebate u/s 87A for income up to 7 lakhs
      if (incomeNum <= 700000) tax = 0;
    } else {
      // Old Regime
      if (incomeNum <= 250000) tax = 0;
      else if (incomeNum <= 500000) tax = (incomeNum - 250000) * 0.05;
      else if (incomeNum <= 1000000)
        tax = 12500 + (incomeNum - 500000) * 0.2;
      else tax = 112500 + (incomeNum - 1000000) * 0.3;
    }

    const cess = tax * 0.04;
    setResult({
      tax: Math.round(tax),
      cess: Math.round(cess),
      total: Math.round(tax + cess),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5 text-primary" />
          Income Tax Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Total Taxable Income</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Enter income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tax Regime</Label>
          <Select value={regime} onValueChange={setRegime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Regime (FY 2025-26)</SelectItem>
              <SelectItem value="old">Old Regime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="gradient" className="w-full" onClick={calculateTax}>
          Calculate Tax
        </Button>

        {result && (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Income Tax</span>
              <span className="font-semibold">
                ₹{result.tax.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Health & Education Cess (4%)
              </span>
              <span className="font-semibold">
                ₹{result.cess.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-medium">Total Tax Liability</span>
              <span className="text-lg font-bold text-primary">
                ₹{result.total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InterestCalculator() {
  const [taxAmount, setTaxAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [result, setResult] = useState<{
    months: number;
    interest: number;
    section: string;
  } | null>(null);

  const calculateInterest = () => {
    const tax = parseFloat(taxAmount) || 0;
    const due = new Date(dueDate);
    const payment = new Date(paymentDate);

    if (payment <= due) {
      setResult({ months: 0, interest: 0, section: "234A" });
      return;
    }

    const monthsDiff =
      (payment.getFullYear() - due.getFullYear()) * 12 +
      (payment.getMonth() - due.getMonth()) +
      1;

    // Section 234A: 1% per month
    const interest = Math.round(tax * 0.01 * monthsDiff);

    setResult({
      months: monthsDiff,
      interest,
      section: "234A",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Percent className="h-5 w-5 text-primary" />
          Interest Calculator (234A/B/C)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tax Amount Due</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Enter tax amount"
              value={taxAmount}
              onChange={(e) => setTaxAmount(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Payment Date</Label>
            <Input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="gradient"
          className="w-full"
          onClick={calculateInterest}
        >
          Calculate Interest
        </Button>

        {result && (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Section</span>
              <span className="font-semibold">{result.section}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Delay Period
              </span>
              <span className="font-semibold">
                {result.months} month{result.months !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-medium">Interest Payable</span>
              <span className="text-lg font-bold text-danger">
                ₹{result.interest.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GSTLateFeeCalculator() {
  const [returnType, setReturnType] = useState("gstr3b");
  const [dueDate, setDueDate] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    lateFee: number;
  } | null>(null);

  const calculateLateFee = () => {
    const due = new Date(dueDate);
    const filing = new Date(filingDate);

    if (filing <= due) {
      setResult({ days: 0, lateFee: 0 });
      return;
    }

    const days = Math.ceil(
      (filing.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
    );

    // GSTR-3B: Rs. 50 per day (CGST + SGST) for normal, Rs. 20 for nil
    let lateFee = days * 50; // Simplified calculation
    lateFee = Math.min(lateFee, 10000); // Max cap

    setResult({ days, lateFee });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-secondary" />
          GST Late Fee Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Return Type</Label>
          <Select value={returnType} onValueChange={setReturnType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gstr3b">GSTR-3B</SelectItem>
              <SelectItem value="gstr1">GSTR-1</SelectItem>
              <SelectItem value="gstr9">GSTR-9 (Annual)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Filing Date</Label>
            <Input
              type="date"
              value={filingDate}
              onChange={(e) => setFilingDate(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="gradient-secondary"
          className="w-full"
          onClick={calculateLateFee}
        >
          Calculate Late Fee
        </Button>

        {result && (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Days Delayed
              </span>
              <span className="font-semibold">{result.days} days</span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-medium">Late Fee (CGST + SGST)</span>
              <span className="text-lg font-bold text-warning">
                ₹{result.lateFee.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TDSCalculator() {
  const [amount, setAmount] = useState("");
  const [section, setSection] = useState("194C");
  const [result, setResult] = useState<{
    tds: number;
    rate: number;
  } | null>(null);

  const tdsRates: Record<string, number> = {
    "194C": 1, // Contractors - Individual
    "194J": 10, // Professional fees
    "194H": 5, // Commission
    "194I": 10, // Rent
    "194A": 10, // Interest
  };

  const calculateTDS = () => {
    const amt = parseFloat(amount) || 0;
    const rate = tdsRates[section] || 10;
    const tds = Math.round(amt * (rate / 100));

    setResult({ tds, rate });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-secondary" />
          TDS Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Payment Amount</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>TDS Section</Label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="194C">194C - Contractors (1%)</SelectItem>
              <SelectItem value="194J">194J - Professional Fees (10%)</SelectItem>
              <SelectItem value="194H">194H - Commission (5%)</SelectItem>
              <SelectItem value="194I">194I - Rent (10%)</SelectItem>
              <SelectItem value="194A">194A - Interest (10%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="gradient-secondary"
          className="w-full"
          onClick={calculateTDS}
        >
          Calculate TDS
        </Button>

        {result && (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">TDS Rate</span>
              <span className="font-semibold">{result.rate}%</span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-medium">TDS Amount</span>
              <span className="text-lg font-bold text-secondary">
                ₹{result.tds.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
