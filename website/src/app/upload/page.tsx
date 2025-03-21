"use client";

import React, { useState } from "react";
import axios from "axios";
import { Info } from "lucide-react";

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

      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
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
    <div className="bg-gradient-to-br from-black via-[#0b0b2d] via-[#0c1445] to-black animate-gradient min-h-screen py-28 px-4">
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Upload Photo
        </h2>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="text-gray-700 font-medium text-lg">Name</label>
            <span className="text-red-500 ml-2">*</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
            placeholder="Nature"
          />
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="text-gray-700 font-medium text-lg">
              Categories
            </label>
            <span className="text-red-500 ml-2">*</span>
          </div>

          <div className="flex mb-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 border border-gray-300 rounded-l shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
              placeholder="Add a category (e.g. nature, landscape)"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border border-blue-500 rounded-r transition-colors"
              onClick={handleAddCategory}
              title="Add Category"
            >
              +
            </button>
          </div>

          <div className="text-sm text-gray-600 mb-3">
            Type a category and press Enter or the + button to add it
          </div>

          {categories.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">
                Added Categories:
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                  >
                    <span className="mr-2">{category}</span>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="text-gray-700 font-medium text-lg">Photo</label>
            <span className="text-red-500 ml-2">*</span>
          </div>
          <div className="w-full border border-gray-300 rounded bg-white overflow-hidden">
            <label className="block w-full cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center px-4 py-3">
                <div className="bg-blue-500 text-white px-3 py-1 rounded mr-3">
                  Browse
                </div>
                <span className="text-gray-500 truncate">
                  {image ? image.name : "No file chosen"}
                </span>
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
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}
        <button
          type="button"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded shadow-md transition-all transform hover:-translate-y-1 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleUploadPhoto}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Uploading...
            </span>
          ) : (
            "Upload Photo"
          )}
        </button>
        <div className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4 flex flex-row items-center gap-2">
          <Info />
          <p className="font-medium">
            You can upload an image only if you are allowed by the admin.
            Contact the email for permission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormUI;
