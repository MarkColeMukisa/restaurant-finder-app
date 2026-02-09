"use client";

import React, { useState } from "react";
import {
    Settings,
    Globe,
    Mail,
    Shield,
    Key,
    Save,
    Bell,
    Palette,
    Database,
    Loader2,
    Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // General Settings
    const [generalSettings, setGeneralSettings] = useState({
        siteName: "DineDiscover",
        siteDescription: "Discover the best restaurants near you",
        supportEmail: "support@dinediscover.ug",
        timezone: "Africa/Nairobi",
        language: "en",
        maintenanceMode: false
    });

    // Email Settings
    const [emailSettings, setEmailSettings] = useState({
        smtpHost: "",
        smtpPort: "587",
        smtpUser: "",
        smtpPassword: "",
        fromEmail: "noreply@dinediscover.ug",
        fromName: "DineDiscover"
    });

    // Notification Settings
    const [notifications, setNotifications] = useState({
        newUserEmail: true,
        newReviewEmail: true,
        newInquiryEmail: true,
        weeklyDigest: false,
        systemAlerts: true
    });

    // Security Settings
    const [security, setSecurity] = useState({
        twoFactorEnabled: false,
        sessionTimeout: "24",
        maxLoginAttempts: "5",
        passwordMinLength: "8",
        requireUppercase: true,
        requireNumbers: true
    });

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setSaved(true);
        toast.success("Settings saved successfully!");
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage your platform configuration and preferences.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90 gap-2"
                >
                    {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : saved ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {isSaving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-slate-100/80 p-1 rounded-xl">
                    <TabsTrigger value="general" className="rounded-lg gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Globe className="h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="email" className="rounded-lg gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Mail className="h-4 w-4" />
                        Email
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Shield className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                General Settings
                            </CardTitle>
                            <CardDescription>Basic platform configuration and branding.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">Site Name</Label>
                                    <Input
                                        id="siteName"
                                        value={generalSettings.siteName}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email</Label>
                                    <Input
                                        id="supportEmail"
                                        type="email"
                                        value={generalSettings.supportEmail}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="siteDescription">Site Description</Label>
                                <Textarea
                                    id="siteDescription"
                                    value={generalSettings.siteDescription}
                                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Timezone</Label>
                                    <Select
                                        value={generalSettings.timezone}
                                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                                            <SelectItem value="Africa/Kampala">Africa/Kampala (EAT)</SelectItem>
                                            <SelectItem value="UTC">UTC</SelectItem>
                                            <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <Select
                                        value={generalSettings.language}
                                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="sw">Swahili</SelectItem>
                                            <SelectItem value="lg">Luganda</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Maintenance Mode</Label>
                                    <p className="text-sm text-slate-500">
                                        When enabled, only admins can access the site.
                                    </p>
                                </div>
                                <Switch
                                    checked={generalSettings.maintenanceMode}
                                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                Email Notifications
                            </CardTitle>
                            <CardDescription>Configure which events trigger email notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { key: "newUserEmail", label: "New User Registration", desc: "Receive email when a new user signs up" },
                                { key: "newReviewEmail", label: "New Review Submitted", desc: "Receive email when a user posts a review" },
                                { key: "newInquiryEmail", label: "New Contact Inquiry", desc: "Receive email for new contact form submissions" },
                                { key: "weeklyDigest", label: "Weekly Digest", desc: "Receive a weekly summary of platform activity" },
                                { key: "systemAlerts", label: "System Alerts", desc: "Critical system notifications and alerts" }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">{item.label}</Label>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                    <Switch
                                        checked={notifications[item.key]}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Email Settings */}
                <TabsContent value="email" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                SMTP Configuration
                            </CardTitle>
                            <CardDescription>Configure your email server for sending notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="smtpHost">SMTP Host</Label>
                                    <Input
                                        id="smtpHost"
                                        placeholder="smtp.example.com"
                                        value={emailSettings.smtpHost}
                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPort">SMTP Port</Label>
                                    <Input
                                        id="smtpPort"
                                        placeholder="587"
                                        value={emailSettings.smtpPort}
                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpUser">SMTP Username</Label>
                                    <Input
                                        id="smtpUser"
                                        value={emailSettings.smtpUser}
                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                                    <Input
                                        id="smtpPassword"
                                        type="password"
                                        value={emailSettings.smtpPassword}
                                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fromEmail">From Email</Label>
                                    <Input
                                        id="fromEmail"
                                        type="email"
                                        value={emailSettings.fromEmail}
                                        onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fromName">From Name</Label>
                                    <Input
                                        id="fromName"
                                        value={emailSettings.fromName}
                                        onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Mail className="h-4 w-4" />
                                Send Test Email
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>Configure authentication and security options.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Two-Factor Authentication</Label>
                                    <p className="text-sm text-slate-500">
                                        Require 2FA for admin accounts.
                                    </p>
                                </div>
                                <Switch
                                    checked={security.twoFactorEnabled}
                                    onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                                    <Input
                                        id="sessionTimeout"
                                        type="number"
                                        value={security.sessionTimeout}
                                        onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                                    <Input
                                        id="maxLoginAttempts"
                                        type="number"
                                        value={security.maxLoginAttempts}
                                        onChange={(e) => setSecurity({ ...security, maxLoginAttempts: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-base">Password Requirements</Label>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="passwordMinLength" className="text-sm text-slate-600">Minimum Length</Label>
                                        <Input
                                            id="passwordMinLength"
                                            type="number"
                                            value={security.passwordMinLength}
                                            onChange={(e) => setSecurity({ ...security, passwordMinLength: e.target.value })}
                                            className="w-32"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={security.requireUppercase}
                                            onCheckedChange={(checked) => setSecurity({ ...security, requireUppercase: checked })}
                                        />
                                        <Label className="text-sm text-slate-600">Require uppercase letters</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={security.requireNumbers}
                                            onCheckedChange={(checked) => setSecurity({ ...security, requireNumbers: checked })}
                                        />
                                        <Label className="text-sm text-slate-600">Require numbers</Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* API Keys Section */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="h-5 w-5 text-primary" />
                                API Keys
                            </CardTitle>
                            <CardDescription>Manage API keys for third-party integrations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900">Production API Key</p>
                                        <p className="text-sm text-slate-500 font-mono mt-1">sk_live_••••••••••••••••</p>
                                    </div>
                                    <Button variant="outline" size="sm">Regenerate</Button>
                                </div>
                            </div>
                            <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900">Test API Key</p>
                                        <p className="text-sm text-slate-500 font-mono mt-1">sk_test_••••••••••••••••</p>
                                    </div>
                                    <Button variant="outline" size="sm">Regenerate</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
