"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Info,
  Upload,
  Image as ImageIcon,
  Tag,
  X,
  FileImage,
  Sparkles,
} from "lucide-react";
import { api } from "@/utils/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/providers/SessionProvider";

const FormUI = () => {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace("/");
    }
  }, [sessionLoading, session, router]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  interface KeyPressEvent extends React.KeyboardEvent<HTMLInputElement> {}

  const handleKeyPress = (e: KeyPressEvent) => {
    if (e.key === "Enter" && newCategory.trim()) {
      e.preventDefault();
      handleAddCategory();
    }
  };

  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleFileChange = (e: FileChangeEvent) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleUploadPhoto = async () => {
    if (!name || categories.length === 0 || !image) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("name", name);

      // Append each category individually instead of using JSON.stringify
      categories.forEach((category) => {
        formData.append("categories", category);
      });

      const response = await api.post("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setCategories([]);
      setImage(null);
    } catch (err) {
      console.error("Upload failed:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Upload failed");
      } else {
        setError("Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading || !session) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-ink-950">
        <p className="font-mono text-sm text-paper-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-ink-950 px-4 py-8 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-brand-accentColor/15 blur-[120px]" />
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      />

      <div className="relative z-10 mx-auto mt-8 w-full max-w-2xl sm:mt-12">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-brand-accentColor/30 bg-brand-accentColor/10 sm:h-14 sm:w-14">
            <Sparkles className="h-6 w-6 text-brand-accentColor sm:h-7 sm:w-7" />
          </div>
          <h1 className="font-display text-2xl font-medium text-paper-100 sm:text-3xl md:text-4xl">
            Upload photo
          </h1>
        </div>

        <Card className="mt-8 rounded-sm border border-ink-600 bg-ink-900 shadow-[8px_8px_0_0_#fdd700]">
          <CardHeader className="border-b border-ink-700 px-4 pb-4 pt-4 sm:px-6 sm:pt-6">
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-paper-100 sm:text-xl">
              <div className="rounded-sm bg-brand-accentColor/15 p-1.5">
                <Upload className="h-4 w-4 text-brand-accentColor sm:h-5 sm:w-5" />
              </div>
              Photo details
            </CardTitle>
            <CardDescription className="mt-1 text-xs text-paper-400 sm:text-sm">
              Fill in the information below to publish a wallpaper
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-4 pb-6 pt-5 sm:px-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-300">
                <ImageIcon className="h-3.5 w-3.5 text-brand-accentColor" />
                Photo name
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-sm border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-500 focus:border-brand-accentColor"
                placeholder="e.g., Sunset over mountains"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-300">
                <Tag className="h-3.5 w-3.5 text-brand-accentColor" />
                Categories
                <span className="text-red-400">*</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 rounded-sm border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-paper-100 outline-none transition-colors placeholder:text-paper-500 focus:border-brand-accentColor"
                  placeholder="Add a category (e.g. nature, landscape)"
                />
                <button
                  type="button"
                  className="min-w-[50px] rounded-sm bg-brand-accentColor px-5 text-lg font-bold text-ink-950 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  onClick={handleAddCategory}
                  title="Add category"
                >
                  +
                </button>
              </div>

              <p className="flex items-center gap-1.5 text-xs text-paper-500">
                <Info className="h-3.5 w-3.5" />
                Type a category and press Enter or click + to add it
              </p>

              {categories.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper-400">
                    Added categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-1.5 rounded-sm border border-ink-600 bg-ink-800 px-3 py-1.5"
                      >
                        <span className="text-xs font-medium text-paper-100">
                          {category}
                        </span>
                        <button
                          type="button"
                          className="text-paper-500 transition-colors hover:text-red-400"
                          onClick={() => handleRemoveCategory(index)}
                          title="Remove category"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-300">
                <FileImage className="h-3.5 w-3.5 text-brand-accentColor" />
                Photo file
                <span className="text-red-400">*</span>
              </label>
              <label className="block w-full cursor-pointer">
                <div
                  className={`w-full rounded-sm border-2 border-dashed p-6 transition-colors ${
                    image
                      ? "border-brand-accentColor bg-brand-accentColor/5"
                      : "border-ink-600 bg-ink-800 hover:border-paper-500"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center space-y-3 text-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-sm ${
                        image ? "bg-brand-accentColor" : "bg-ink-700"
                      }`}
                    >
                      <FileImage
                        className={`h-7 w-7 ${
                          image ? "text-ink-950" : "text-paper-500"
                        }`}
                      />
                    </div>
                    {image ? (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-paper-100">
                          {image.name}
                        </p>
                        <p className="text-xs text-paper-500">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-paper-200">
                          Click to browse or drag and drop
                        </p>
                        <p className="text-xs text-paper-500">
                          PNG, JPG, WEBP up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-sm border border-red-500/30 bg-red-500/10 p-3">
                <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                <p className="flex-1 text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="button"
              className={`flex w-full items-center justify-center gap-2 rounded-sm bg-brand-accentColor px-6 py-3 text-sm font-semibold text-ink-950 shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              onClick={handleUploadPhoto}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Uploading…</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload photo</span>
                </>
              )}
            </button>

            <div className="mt-5 border-t border-ink-700 pt-5">
              <div className="flex items-start gap-3 rounded-sm border border-ink-600 bg-ink-800 p-3">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accentColor" />
                <p className="text-xs leading-relaxed text-paper-400 sm:text-sm">
                  <span className="font-semibold text-paper-200">Note:</span>{" "}
                  You can upload an image only if you are allowed by the
                  admin. Contact{" "}
                  <a
                    href="mailto:sohailatwork10@gmail.com"
                    className="break-all text-brand-accentColor hover:underline"
                  >
                    sohailatwork10@gmail.com
                  </a>{" "}
                  for permission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormUI;
