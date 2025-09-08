"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  hindi = "Hindi",
  bothHindiAndEnglish = "Both Hindi and English",
}

export default function Home() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel | null>(null);
  const [roastStatus, setRoastStatus] = useState<RoastStatus | null>(null);
  const [roleType, setRoleType] = useState<RoleType | null>(null);
  const [language, setLanguage] = useState<Languages | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [roastResult, setRoastResult] = useState<string | null>(null);
  const [showResumeText, setShowResumeText] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a resume first!");
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
      const res = await fetch("https://expert-fishstick-r9rv9pgp5rvfx9jq-8000.app.github.dev/roast", {
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
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-300 rounded-full opacity-60 animate-slow-rotate" />
      <div className="absolute top-20 right-10 w-56 h-56 bg-pink-300 rounded-full opacity-50 animate-slow-rotate" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-300 rounded-full opacity-50 animate-slow-rotate" />
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-green-300 rounded-full opacity-50 animate-slow-rotate" />
      <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-yellow-300 rounded-full opacity-40 animate-slow-rotate" />

      {/* Main Card */}
      <Card className="relative w-full max-w-2xl shadow-2xl rounded-2xl border border-gray-200 z-10 bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-black">
            🔥 Roast Generator
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Upload your resume & choose roast preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PDF Upload */}
          <div>
            <label className="block mb-2 font-medium text-black">Upload Resume (PDF)</label>
            <Input type="file" accept="application/pdf" onChange={handleFileChange} className="cursor-pointer border border-gray-300" />
            {file && <p className="mt-2 text-sm text-gray-700">📄 {file.name}</p>}
          </div>

          {/* Roast Level */}
          <div>
            <label className="block mb-2 font-medium text-black">Roast Level</label>
            <Select onValueChange={(v: RoastLevel) => setRoastLevel(v)}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Choose roast level" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(RoastLevel).map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Roast Status */}
          <div>
            <label className="block mb-2 font-medium text-black">Roast Status</label>
            <Select onValueChange={(v: RoastStatus) => setRoastStatus(v)}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Choose roast status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(RoastStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Role Type */}
          <div>
            <label className="block mb-2 font-medium text-black">Role Type</label>
            <Select onValueChange={(v: RoleType) => setRoleType(v)}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Choose role type" />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {Object.values(RoleType).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Languages */}
          <div>
            <label className="block mb-2 font-medium text-black">Language</label>
            <Select onValueChange={(v: Languages) => setLanguage(v)}>
              <SelectTrigger className="border border-gray-300">
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Languages).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary */}
          <div className="p-4 border rounded-lg bg-gray-50 text-black">
            <p className="font-semibold">✨ Your Selection:</p>
            <p>📄 File: {file ? file.name : "-"}</p>
            <p>🔥 Roast Level: {roastLevel || "-"}</p>
            <p>⚡ Status: {roastStatus || "-"}</p>
            <p>🎭 Role: {roleType || "-"}</p>
            <p>🌍 Language: {language || "-"}</p>
          </div>

          {/* Roast Result */}
          {loading && <p className="text-center text-gray-500">⏳ Generating roast...</p>}
          {roastResult && (
            <div className="p-4 border rounded-lg bg-black text-white whitespace-pre-line">
              <p className="font-semibold text-lg">🔥 Roast Result:</p>
              <p className="mt-2">{roastResult}</p>
            </div>
          )}

          {/* Resume Preview Toggle */}
          {apiResponse?.resume_text && (
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setShowResumeText(!showResumeText)}
                className="w-full"
              >
                {showResumeText ? "🙈 Hide Extracted Resume Text" : "👀 Show Extracted Resume Text"}
              </Button>

              {showResumeText && (
                <div className="mt-3 p-4 border rounded-lg bg-gray-100 text-black whitespace-pre-line max-h-64 overflow-y-auto">
                  <p className="font-semibold text-lg">📄 Extracted Resume Text:</p>
                  <p className="mt-2 text-sm">{apiResponse.resume_text}</p>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-800 text-lg rounded-xl"
          >
            {loading ? "Generating..." : "Generate Roast 🚀"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
