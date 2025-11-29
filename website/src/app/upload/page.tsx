"use client";

import React, { useState } from "react";
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
import { Spotlight } from "@/components/ui/Spotlight";

const FormUI = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accentColor/5 to-transparent pointer-events-none" />
      <div className="max-w-2xl mx-auto w-full relative z-10 mt-8 sm:mt-12">
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-brand-accentColor/30 to-brand-accentColor/10 mb-2 sm:mb-4 backdrop-blur-sm border border-brand-accentColor/20 shadow-lg shadow-brand-accentColor/20">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accentColor" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
            Upload Photo
          </h1>
        </div>

        <Card className="border border-white/10 shadow-2xl bg-gradient-to-br from-white/95 via-white/98 to-yellow-50/40 backdrop-blur-xl">
          <CardHeader className="pb-4 pt-4 sm:pt-6 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-brand-accentColor/20">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accentColor" />
              </div>
              Photo Details
            </CardTitle>
            <CardDescription className="text-gray-600 text-xs sm:text-sm mt-1">
              Fill in the information below to upload photo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                <div className="p-1 rounded-lg bg-brand-accentColor/10">
                  <ImageIcon className="w-4 h-4 text-brand-accentColor" />
                </div>
                Photo Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-accentColor focus:border-brand-accentColor outline-none transition-all bg-white hover:border-gray-300 text-gray-900 placeholder:text-gray-400 font-medium text-sm"
                placeholder="e.g., Sunset Over Mountains"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                <div className="p-1 rounded-lg bg-brand-accentColor/10">
                  <Tag className="w-4 h-4 text-brand-accentColor" />
                </div>
                Categories
                <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-accentColor focus:border-brand-accentColor outline-none transition-all bg-white hover:border-gray-300 text-gray-900 placeholder:text-gray-400 font-medium text-sm"
                    placeholder="Add a category (e.g. nature, landscape)"
                  />
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r from-brand-accentColor to-yellow-400 hover:from-yellow-400 hover:to-brand-accentColor text-black px-5 py-2.5 rounded-xl transition-all font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center min-w-[50px] text-lg"
                  onClick={handleAddCategory}
                  title="Add Category"
                >
                  +
                </button>
              </div>

              <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                <Info className="w-3.5 h-3.5" />
                Type a category and press Enter or click + to add it
              </p>

              {categories.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-gray-800 font-semibold text-sm">
                    Added Categories:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 px-3 py-1.5 rounded-full border-2 border-yellow-200 shadow-sm hover:shadow-md transition-all group hover:border-yellow-300"
                      >
                        <span className="text-gray-900 font-medium text-xs">
                          {category}
                        </span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-600 transition-colors p-0.5 rounded-full hover:bg-red-50 group-hover:bg-red-50"
                          onClick={() => handleRemoveCategory(index)}
                          title="Remove category"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                <div className="p-1 rounded-lg bg-brand-accentColor/10">
                  <FileImage className="w-4 h-4 text-brand-accentColor" />
                </div>
                Photo File
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <label className="block w-full cursor-pointer group">
                  <div
                    className={`w-full border-2 border-dashed rounded-xl bg-gradient-to-br from-white to-gray-50/80 p-6 transition-all shadow-sm ${
                      image
                        ? "border-brand-accentColor bg-gradient-to-br from-yellow-50/50 to-yellow-100/30 shadow-md shadow-brand-accentColor/20"
                        : "border-gray-300 hover:border-brand-accentColor hover:bg-yellow-50/30 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center text-center space-y-3">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-md ${
                          image
                            ? "bg-gradient-to-br from-brand-accentColor to-yellow-400"
                            : "bg-gray-100 group-hover:bg-brand-accentColor/20"
                        }`}
                      >
                        <FileImage
                          className={`w-7 h-7 transition-colors ${
                            image
                              ? "text-black"
                              : "text-gray-400 group-hover:text-brand-accentColor"
                          }`}
                        />
                      </div>
                      <div>
                        {image ? (
                          <div className="space-y-1">
                            <p className="text-gray-900 font-semibold text-sm">
                              {image.name}
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              Click to change file
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-gray-800 font-semibold text-sm">
                              Click to browse or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 font-medium">
                              PNG, JPG, WEBP up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
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
            </div>
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-300 rounded-xl flex items-start gap-3 shadow-md">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <X className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-red-700 font-semibold flex-1 text-sm">
                  {error}
                </p>
              </div>
            )}

            <button
              type="button"
              className={`w-full bg-gradient-to-r from-brand-accentColor via-yellow-400 to-brand-accentColor hover:from-yellow-400 hover:via-brand-accentColor hover:to-yellow-400 text-black py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-bold text-base flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleUploadPhoto}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-black"
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
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Photo</span>
                </>
              )}
            </button>

            <div className="mt-5 pt-5 border-t border-gray-200">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50/80 to-yellow-100/50 border-2 border-yellow-200 rounded-xl shadow-sm">
                <div className="p-1.5 rounded-lg bg-yellow-200/50 flex-shrink-0">
                  <Info className="w-4 h-4 text-yellow-700" />
                </div>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  <span className="font-semibold text-gray-900">Note:</span> You
                  can upload an image only if you are allowed by the admin.
                  Contact the email{" "}
                  <a
                    href="mailto:sohailatwork10@gmail.com"
                    className="text-brand-accentColor hover:underline break-all"
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
