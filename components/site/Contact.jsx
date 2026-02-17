"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, Facebook, Twitter, Instagram, Linkedin, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to send message");

            toast.success("Message sent successfully!", {
                description: "We'll get back to you shortly.",
            });

            // Reset form
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message", {
                description: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">

            {/* Header Section */}
            <section className="bg-slate-50 py-20 border-b border-slate-100 mb-12">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                            Have a question about a restaurant or want to partner with us? We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-1/2"
                    >
                        <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="text-primary" size={24} />
                                Send us a message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Name</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Email</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Subject</label>
                                    <Input
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Partnership Inquiry"
                                        className="h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Message</label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help you?"
                                        className="min-h-[150px] bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-primary resize-none"
                                    />
                                </div>
                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                                >
                                    {isSubmitting ? (
                                        <>Sending... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                                    ) : (
                                        <>Send Message <Send size={18} className="ml-2" /></>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:w-1/2 space-y-12"
                    >
                        {/* Info Grid */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Headquarters</h3>
                                    <p className="text-foreground/60 leading-relaxed">
                                        MUBS, <br />
                                        Nakawa, Kampala, Uganda
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Email Us</h3>
                                    <p className="text-foreground/60">help@dinediscover.com</p>
                                    <p className="text-foreground/60">partners@dinediscover.com</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Call Us</h3>
                                    <p className="text-foreground/60">+1 (555) 123-4567</p>
                                    <p className="text-foreground/60">Mon-Fri, 9am - 6pm EST</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Facebook size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Follow Us</h3>
                                    <div className="flex gap-4 text-foreground/40 mt-2">
                                        <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                                        <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                                        <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-[300px] w-full bg-slate-100 rounded-[2rem] overflow-hidden shadow-inner border border-slate-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
