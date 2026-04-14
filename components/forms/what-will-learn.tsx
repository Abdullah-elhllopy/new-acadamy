'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'

interface WhatWillLearnItem {
  id: string
  text: string
}

interface WhatWillLearnProps {
  items: WhatWillLearnItem[]
  onChange: (items: WhatWillLearnItem[]) => void;
  type ?: string
}

export function WhatWillLearn({ items, onChange ,type }: WhatWillLearnProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (!inputValue.trim()) return

    const newItem: WhatWillLearnItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputValue.trim()
    }

    onChange([...items, newItem])
    setInputValue('')
  }

  const handleDelete = (id: string) => {
    onChange(items.filter(item => item.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <Card className='flex-1 w-full'>
      <CardHeader>
        <CardTitle>What Will You Learn {type} </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Item */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="whatLearn" className="sr-only">
              Learning objective
            </Label>
            <Input
              id="whatLearn"
              placeholder="Enter learning objective..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button type="button" onClick={handleAdd} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Items List */}
        {items.length > 0 && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-3 rounded-md border bg-muted/50"
              >
                <span className="flex-1 text-sm">
                  {index + 1}. {item.text}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No learning objectives added yet
          </p>
        )}
      </CardContent>
    </Card>
  )
}
