//This page is for editing the card information
//Crud

//Start by allowing the user just to add a card.

'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function EditCard() {
  const [formData, setFormData] = useState({
    card_id: '',
    card_title: '',
    main_url: '',
    model_number: '',
    card_body: '',
    mfg: '',
    card_type: '',
    main_card_image: '',
    mfg_price: '',
    card_family: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert mfg_price to number
    const numericPrice = parseFloat(formData.mfg_price)
    
    const { data, error } = await supabase
      .from('cards')
      .insert([
        {
          ...formData,
          mfg_price: numericPrice
        }
      ])

    if (error) {
      alert('Error saving card: ' + error.message)
    } else {
      alert('Card saved successfully!')
      // Reset form
      setFormData({
        card_id: '',
        card_title: '',
        main_url: '',
        model_number: '',
        card_body: '',
        mfg: '',
        card_type: '',
        main_card_image: '',
        mfg_price: '',
        card_family: ''
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Card</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="space-y-2">

          <label className="block">
            Title*:
            <input
              type="text"
              name="card_title"
              value={formData.card_title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Product Title"
            />
          </label>

          <label className="block">
            Model Number*:
            <input
              type="text"
              name="model_number"
              value={formData.model_number}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="e.g., 48-22-8425"
            />
          </label>

          <label className="block">
            Manufacturer*:
            <input
              type="text"
              name="mfg"
              value={formData.mfg}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="e.g., Milwaukee"
            />
          </label>


          <label className="block">
            Family:
            <select
              name="card_family"
              value={formData.card_family}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Family</option>
              <option value="M12">M12</option>
              <option value="M18">M18</option>
              <option value="Milwaukee Packout">Milwaukee Packout</option>
              <option value="M12/M18">M12/M18</option>
            </select>
          </label>

          <label className="block">
            Type:
            <select
              name="card_type"
              value={formData.card_type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
            <option value="">Select Card Type</option>
              <option value="Product">Product</option>
              <option value="Accessory">Accessory</option>
              <option value="Hack">Hack</option>
            </select>
          </label>

          <label className="block">
            Main URL:
            <input
              type="url"
              name="main_url"
              value={formData.main_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
          </label>

          <label className="block">
            Image URL:
            <input
              type="url"
              name="main_card_image"
              value={formData.main_card_image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
          </label>

          <label className="block">
            Description:
            <textarea
              name="card_body"
              value={formData.card_body}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Product description..."
            />
          </label>

          <label className="block">
            Price:
            <input
              type="number"
              name="mfg_price"
              value={formData.mfg_price}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded"
              placeholder="0.00"
            />
          </label>


        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Save Card
          </button>
        </div>
      </form>
    </div>
  )
}





