import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Cake, History, Trash2 } from "lucide-react";

interface SavedCard {
  id: number;
  text: string;
  name: string;
}

export default function LuxuryBirthdayStacker() {
  const [formData, setFormData] = useState({ name: '', age: '', hobby: '' });
  const [cardHistory, setCardHistory] = useState<SavedCard[]>([]);

  const generateJoke = () => {
    const { name, age, hobby } = formData;
    if (!name && !age && !hobby) return;

    const jokes = [
      `Happy ${age}th Birthday, ${name}! I was going to make a joke about you getting old, but I was afraid you'd hit me with your ${hobby} gear.`,
      `Congrats on turning ${age}, ${name}! You're now at the age where a "wild night out" means staying up to finish ${hobby}.`,
      `${name}, you're ${age} now. They say wisdom comes with age. In your case, it seems only an obsession with ${hobby} showed up.`,
      `Happy Birthday ${name}! You are officially ${age}. That is roughly the same amount of times you've mentioned ${hobby} this week.`,
      `Don't worry about turning ${age}, ${name}. You're still young enough to enjoy ${hobby}, but old enough to need a nap afterwards.`
    ];

    const newCard = {
      id: Date.now(),
      text: jokes[Math.floor(Math.random() * jokes.length)],
      name: name || "Legend"
    };
    
    setCardHistory([newCard, ...cardHistory]);
  };

  const clearHistory = () => setCardHistory([]);

  // Color Palette mapping
  const colors = {
    navy: "#000080",
    red: "#FF0000",
    wine: "#9E2A3A",
    brown: "#3A2525"
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center bg-[#fdfcfb]">
      
      {/* FESTIVE HEADER */}
      <header className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center justify-center p-4 rounded-full mb-2" style={{ backgroundColor: `${colors.navy}10` }}>
            <Cake className="h-10 w-10" style={{ color: colors.red }} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase" style={{ color: colors.navy }}>
          The Birthday <span style={{ color: colors.red }}>Vault</span>
        </h1>
        <p className="font-bold tracking-[0.3em] uppercase text-xs" style={{ color: colors.wine }}>
          Custom Wit • Premium Roast • Infinite Cheer
        </p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: INPUT AREA */}
        <div className="lg:col-span-4 lg:sticky lg:top-12">
            <Card className="border-2 shadow-2xl" style={{ borderColor: colors.navy }}>
                <div className="h-2 w-full" style={{ backgroundColor: colors.red }}></div>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold" style={{ color: colors.navy }}>Generator</CardTitle>
                    <CardDescription>Details for the guest of honor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label style={{ color: colors.brown }}>Name</Label>
                        <Input 
                            placeholder="Recipient" 
                            className="focus-visible:ring-0 border-2" 
                            style={{ borderColor: `${colors.navy}30` }}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label style={{ color: colors.brown }}>Age</Label>
                            <Input 
                                type="number" 
                                placeholder="Age" 
                                style={{ borderColor: `${colors.navy}30` }}
                                value={formData.age}
                                onChange={(e) => setFormData({...formData, age: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label style={{ color: colors.brown }}>Hobby</Label>
                            <Input 
                                placeholder="Hobby" 
                                style={{ borderColor: `${colors.navy}30` }}
                                value={formData.hobby}
                                onChange={(e) => setFormData({...formData, hobby: e.target.value})}
                            />
                        </div>
                    </div>
                    <Button 
                        className="w-full py-6 text-lg font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: colors.navy, color: 'white' }}
                        onClick={generateJoke}
                    >
                        <Sparkles className="mr-2 h-5 w-5" style={{ color: colors.red }} /> 
                        Create Card
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* RIGHT: THE STACK */}
        <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: `${colors.navy}20` }}>
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" style={{ color: colors.navy }} />
                    <h2 className="font-black uppercase tracking-widest text-sm" style={{ color: colors.navy }}>
                      Card Archive [{cardHistory.length}]
                    </h2>
                </div>
                {cardHistory.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory} style={{ color: colors.wine }}>
                        <Trash2 className="h-4 w-4 mr-2" /> Clear All
                    </Button>
                )}
            </div>

            <div className="space-y-10">
                {cardHistory.length === 0 ? (
                    <div className="h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3" style={{ borderColor: `${colors.navy}20`, color: `${colors.navy}40` }}>
                        <p className="font-medium italic">Begin generation to fill the vault...</p>
                    </div>
                ) : (
                    cardHistory.map((card, index) => (
                        <div 
                            key={card.id}
                            className="relative group transition-all duration-500 animate-in slide-in-from-bottom-10"
                        >
                            {/* Physical Card Mockup */}
                            <div 
                                className="relative bg-white p-10 md:p-16 shadow-2xl border-l-[6px] transition-transform hover:-rotate-1"
                                style={{ borderLeftColor: colors.red, borderRight: `1px solid ${colors.navy}10` }}
                            >
                                {/* Paper Texture/Crease Effect */}
                                <div className="absolute top-0 left-0 w-12 h-full pointer-events-none opacity-10" 
                                     style={{ background: `linear-gradient(to right, ${colors.brown}, transparent)` }}></div>
                                
                                <div className="mb-8">
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black" style={{ color: colors.wine }}>
                                        Officially For {card.name}
                                    </span>
                                    <p className="leading-relaxed text-2xl md:text-3xl font-serif italic mt-6" style={{ color: colors.brown }}>
                                        "{card.text}"
                                    </p>
                                </div>
                                
                                <div className="flex justify-between items-center border-t pt-6" style={{ borderColor: `${colors.navy}10` }}>
                                    <span className="text-xs font-mono" style={{ color: `${colors.navy}40` }}>
                                        SERIAL NO: {card.id}
                                    </span>
                                    <Button 
                                        variant="outline"
                                        className="font-bold border-2 transition-colors"
                                        style={{ borderColor: colors.navy, color: colors.navy }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(card.text);
                                            alert("Copied to clipboard!");
                                        }}
                                    >
                                        <Copy className="mr-2 h-4 w-4" /> Copy Message
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Decorative "Shadow Stack" behind the card */}
                            <div className="absolute -bottom-2 -right-2 w-full h-full -z-10 rounded-lg" style={{ backgroundColor: `${colors.navy}10` }}></div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
}