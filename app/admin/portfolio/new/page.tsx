"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Plus, X } from "lucide-react"

export default function NewPortfolioProject() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    tech_stack: [""],
    github_url: "",
    live_url: "",
    featured: false,
  })
  const [screenshots, setScreenshots] = useState([{ image_url: "", alt_text: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const addTechStack = () => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: [...prev.tech_stack, ""],
    }))
  }

  const removeTechStack = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.filter((_, i) => i !== index),
    }))
  }

  const updateTechStack = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.map((tech, i) => (i === index ? value : tech)),
    }))
  }

  const addScreenshot = () => {
    setScreenshots((prev) => [...prev, { image_url: "", alt_text: "" }])
  }

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index))
  }

  const updateScreenshot = (index: number, field: string, value: string) => {
    setScreenshots((prev) =>
      prev.map((screenshot, i) => (i === index ? { ...screenshot, [field]: value } : screenshot)),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/admin/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tech_stack: formData.tech_stack.filter((tech) => tech.trim() !== ""),
          screenshots: screenshots.filter((s) => s.image_url.trim() !== ""),
        }),
      })

      if (response.ok) {
        router.push("/admin/portfolio")
      } else {
        console.error("Failed to create portfolio project")
      }
    } catch (error) {
      console.error("Error creating portfolio project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Portfolio Project</h1>
          <p className="text-slate-400">Add a new project to your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your project"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack</label>
            {formData.tech_stack.map((tech, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => updateTechStack(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Technology name"
                />
                {formData.tech_stack.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechStack(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTechStack}
              className="inline-flex items-center px-3 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Technology
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-slate-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                id="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, github_url: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label htmlFor="live_url" className="block text-sm font-medium text-slate-300 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                id="live_url"
                value={formData.live_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, live_url: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://project-demo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Screenshots</label>
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
              >
                <div>
                  <input
                    type="url"
                    value={screenshot.image_url}
                    onChange={(e) => updateScreenshot(index, "image_url", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Screenshot URL"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={screenshot.alt_text}
                    onChange={(e) => updateScreenshot(index, "alt_text", e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Alt text"
                  />
                  {screenshots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addScreenshot}
              className="inline-flex items-center px-3 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Screenshot
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-slate-300">
              Featured Project
            </label>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
