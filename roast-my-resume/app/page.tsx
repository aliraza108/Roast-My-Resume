"use client";

import { useState } from "react";
import { Card, CardContent, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Zap, Users, Globe, Eye, EyeOff, Flame, Loader2, Lightbulb, TrendingUp, Linkedin, Briefcase, Facebook, Github, Instagram, Mail } from "lucide-react";
// Enum definitions (unchanged)
enum RoastLevel {
  soft = "Soft-hearted",
  hard = "Hard-hearted",
  light = "Light",
  dark = "Dark",
  vulgar = "Vulgar",
}

enum RoastStatus {
  success = "Success",
  error = "Error",
  loading = "Loading",
  initial = "Initial",
}

enum RoleType {
  memer = "Memer",
  jobInterviewer = "Job Interviewer",
  standupComedian = "Standup Comedian",
  hr = "HR",
  friend = "Friend",
  familyMember = "Family Member",
  boss = "Boss",
  teacher = "Teacher",
  enemy = "Enemy",
  girlfriend = "Girlfriend",
  boyfriend = "Boyfriend",
}

enum Languages {
  english = "English",
  Urdu = "Urdu",
  Chinese = "Chinese",
  French = "French",
  Russian = "Russian",
  Japanese = "Japanese",
  bothHindiAndEnglish = "Both Hindi and English",
}

export default function Home() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel | null>(null);
  const [roastStatus, setRoastStatus] = useState<RoastStatus | null>(null);
  const [roleType, setRoleType] = useState<RoleType | null>(null);
  const [language, setLanguage] = useState<Languages | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string| null>(null);
  const [roastResult, setRoastResult] = useState<string | null>(null);
  const [showResumeText, setShowResumeText] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a resume first!");
    // Simplified validation for a more user-friendly flow
    if (!roastLevel || !roastStatus || !roleType || !language) {
      return alert("Please select all options!");
    }

    setLoading(true);
    setApiResponse(null);
    setRoastResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("roast_level", roastLevel);
    formData.append("roast_status", roastStatus);
    formData.append("role_type", roleType);
    formData.append("language", language);

    try {
      const res = await fetch("https://resume-roaser-fastapi.vercel.app/roast", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setApiResponse(data);
      setRoastResult(data.roast);
    } catch (err) {
      console.error(err);
      setRoastResult("❌ Error fetching roast from server.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col items-center justify-start p-4 md:p-8">
      {/* Background Elements - Inspired by nas.io's glowing, dynamic feel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#FF5B86] to-[#C65BF6] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-[#44C2FD] to-[#34D399] rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-lg mb-4">
            <Flame className="w-6 h-6 text-[#FF5B86]" />
            <span className="text-lg font-semibold text-zinc-300">Resume Roaster</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent mb-4">
            Get Your Resume Roasted
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and let AI provide personalized, brutal feedback in your preferred style.
          </p>
        </div>

        {/* Main Form Card - Neumorphic/3D Style */}
        <Card className="bg-[#1A1A1A] backdrop-blur-sm border border-zinc-700/50 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5),_0_0_100px_rgba(255,91,134,0.1)] overflow-hidden p-6 md:p-10">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Form */}
              <div className="space-y-8">
                {/* File Upload */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <Upload className="w-4 h-4 text-[#C65BF6]" />
                    Upload Resume (PDF)
                  </label>
                  <Input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 transition-colors cursor-pointer border-2 border-dashed border-zinc-700/50 hover:border-zinc-500/50 bg-[#1A1A1A] text-zinc-300 rounded-xl"
                  />
                  {file && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <FileText className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium text-green-300">{file.name}</span>
                    </div>
                  )}
                </div>

                {/* Roast Level */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <Zap className="w-4 h-4 text-[#FFD700]" />
                    Roast Intensity
                  </label>
                  <Select onValueChange={(v: RoastLevel) => setRoastLevel(v)}>
                    <SelectTrigger className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors text-zinc-300 rounded-xl shadow-inner shadow-zinc-900/50">
                      <SelectValue placeholder="How intense should the roast be?" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl">
                      {Object.values(RoastLevel).map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Roast Style */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <TrendingUp className="w-4 h-4 text-[#44C2FD]" />
                    Roast Style
                  </label>
                  <Select onValueChange={(v: RoastStatus) => setRoastStatus(v)}>
                    <SelectTrigger className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors text-zinc-300 rounded-xl shadow-inner shadow-zinc-900/50">
                      <SelectValue placeholder="Choose the roast style" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl">
                      {Object.values(RoastStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Role Type */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <Users className="w-4 h-4 text-[#FF5B86]" />
                    Roaster Persona
                  </label>
                  <Select onValueChange={(v: RoleType) => setRoleType(v)}>
                    <SelectTrigger className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors text-zinc-300 rounded-xl shadow-inner shadow-zinc-900/50">
                      <SelectValue placeholder="Who should roast your resume?" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl">
                      {Object.values(RoleType).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <Globe className="w-4 h-4 text-[#C65BF6]" />
                    Language Preference
                  </label>
                  <Select onValueChange={(v: Languages) => setLanguage(v)}>
                    <SelectTrigger className="bg-zinc-800 border border-zinc-700 hover:border-zinc-600 transition-colors text-zinc-300 rounded-xl shadow-inner shadow-zinc-900/50">
                      <SelectValue placeholder="Choose your preferred language" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl">
                      {Object.values(Languages).map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column - Summary & Results */}
              <div className="space-y-8">
                {/* Configuration Summary */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                  <h3 className="font-bold text-zinc-100 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#FFD700]" />
                    Configuration Summary
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Resume:</span>
                      <span className="font-medium text-zinc-100">{file ? file.name.substring(0, 20) + (file.name.length > 20 ? '...' : '') : 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Intensity:</span>
                      <span className="font-medium text-zinc-100">{roastLevel || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Style:</span>
                      <span className="font-medium text-zinc-100">{roastStatus || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Persona:</span>
                      <span className="font-medium text-zinc-100">{roleType || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Language:</span>
                      <span className="font-medium text-zinc-100">{language || 'Not selected'}</span>
                    </div>
                  </div>
                </div>

                {/* Generate Button - Iconic, gradient button */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-16 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 bg-gradient-to-r from-[#FF5B86] via-[#C65BF6] to-[#44C2FD] hover:from-[#FF5B86]/90 hover:via-[#C65BF6]/90 hover:to-[#44C2FD]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Generating Roast...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Flame className="w-6 h-6" />
                      Generate Roast
                    </div>
                  )}
                </Button>

                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <Loader2 className="w-10 h-10 animate-spin text-[#C65BF6] mx-auto mb-4" />
                      <p className="text-zinc-400">Cooking up your roast...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Roast Result */}
            {roastResult && (
              <div className="mt-12 p-8 bg-[#101010] rounded-2xl shadow-inner shadow-zinc-900/50 border border-zinc-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <Flame className="w-8 h-8 text-[#FF5B86]" />
                  <h3 className="text-2xl font-bold text-zinc-100">Your Roast is Ready!</h3>
                </div>
                <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed whitespace-pre-line text-lg">
                  {roastResult}
                </div>
              </div>
            )}

            {/* Resume Text Preview */}
            {apiResponse?.resume_text && (
              <div className="mt-8">
                <Button
                  onClick={() => setShowResumeText(!showResumeText)}
                  className="w-full bg-transparent text-zinc-400 border border-zinc-700/50 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {showResumeText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showResumeText ? "Hide" : "Show"} Extracted Resume Text
                  </div>
                </Button>

                {showResumeText && (
                  <div className="mt-4 p-6 bg-zinc-900 rounded-xl border border-zinc-700 max-h-96 overflow-y-auto shadow-inner shadow-zinc-950/50">
                    <h4 className="font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#44C2FD]" />
                      Extracted Resume Content
                    </h4>
                    <div className="text-sm text-zinc-400 leading-relaxed bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                      {apiResponse.resume_text}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer Section - Added here */}
      <footer className="mt-auto w-full max-w-5xl mx-auto py-8 border-t border-zinc-700/50 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">Developed by AI Raza</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/raza-abro/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-zinc-300 hover:text-[#0A66C2] transition-colors" />
            </a>
            <a href="https://upwork.com/freelancers/~013de7d4ad7f8e6874" target="_blank" rel="noopener noreferrer">
              <Briefcase className="w-5 h-5 text-zinc-300 hover:text-[#14A800] transition-colors" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61576883505330" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 text-zinc-300 hover:text-[#1877F2] transition-colors" />
            </a>
            <a href="https://github.com/aliraza108" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-zinc-300 hover:text-zinc-100 transition-colors" />
            </a>
            <a href="https://www.instagram.com/aliraza.xyz/" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-zinc-300 hover:text-[#E4405F] transition-colors" />
            </a>
            <a href="mailto:razaabro.dev@gmail.com">
              <Mail className="w-5 h-5 text-zinc-300 hover:text-[#EA4335] transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}