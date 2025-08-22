"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Eye } from "lucide-react"

export default function NewBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    hero_image_url: "",
    published: false,
  })
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

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/admin/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          published: publish,
        }),
      })

      if (response.ok) {
        router.push("/admin/blog")
      } else {
        console.error("Failed to create blog post")
      }
    } catch (error) {
      console.error("Error creating blog post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
          <p className="text-slate-400">Write and publish a new blog post</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog post title"
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
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="hero_image_url" className="block text-sm font-medium text-slate-300 mb-2">
              Hero Image URL
            </label>
            <input
              type="url"
              id="hero_image_url"
              value={formData.hero_image_url}
              onChange={(e) => setFormData((prev) => ({ ...prev, hero_image_url: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-slate-300 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the blog post"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
              Content (HTML)
            </label>
            <textarea
              id="content"
              rows={20}
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="<p>Your blog content here...</p>"
              required
            />
            <p className="text-sm text-slate-400 mt-2">
              You can use HTML tags for formatting. For a production app, consider integrating a rich text editor like
              TinyMCE or Quill.
            </p>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
