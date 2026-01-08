import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"; // Ensure this is installed
import { Sparkles, Copy, Cake, History, Trash2 } from "lucide-react";

interface SavedCard {
  id: number;
  text: string;
  name: string;
}

export default function LuxuryBirthdayStacker() {
  const [formData, setFormData] = useState({ name: '', age: 25, hobby: '' });
  const [cardHistory, setCardHistory] = useState<SavedCard[]>([]);

  const generateJoke = () => {
    const { name, age, hobby } = formData;
    if (!name && !hobby) return;

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

  // Color Palette
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
            <Card className="border-2 shadow-2xl overflow-hidden" style={{ borderColor: colors.navy }}>
                <div className="h-2 w-full" style={{ backgroundColor: colors.red }}></div>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold" style={{ color: colors.navy }}>Generator</CardTitle>
                    <CardDescription>Customize the roast</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Name Input */}
                    <div className="space-y-3">
                        <Label style={{ color: colors.brown }} className="font-bold">Recipient Name</Label>
                        <Input 
                            placeholder="e.g. Sarah" 
                            className="focus-visible:ring-0 border-2" 
                            style={{ borderColor: `${colors.navy}20` }}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    {/* Age Slider */}
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <Label style={{ color: colors.brown }} className="font-bold">Age</Label>
                            <span className="text-lg font-black" style={{ color: colors.navy }}>{formData.age}</span>
                        </div>
                        <Slider
                            defaultValue={[formData.age]}
                            max={100}
                            min={1}
                            step={1}
                            onValueChange={(value) => setFormData({...formData, age: value[0]})}
                            className="py-4"
                            // Note: Customizing Slider colors often requires CSS overrides or inline styles on Slider primitive
                        />
                    </div>

                    {/* Hobby Input */}
                    <div className="space-y-3">
                        <Label style={{ color: colors.brown }} className="font-bold">Hobby</Label>
                        <Input 
                            placeholder="e.g. Golfing" 
                            className="focus-visible:ring-0 border-2" 
                            style={{ borderColor: `${colors.navy}20` }}
                            value={formData.hobby}
                            onChange={(e) => setFormData({...formData, hobby: e.target.value})}
                        />
                    </div>

                    <Button 
                        className="w-full py-7 text-lg font-black uppercase tracking-widest transition-all hover:opacity-95 active:scale-95"
                        style={{ backgroundColor: colors.navy, color: 'white' }}
                        onClick={generateJoke}
                    >
                        <Sparkles className="mr-2 h-5 w-5" style={{ color: colors.red }} /> 
                        Generate & Print
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
                    <div className="h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 text-center p-6" style={{ borderColor: `${colors.navy}20`, color: `${colors.navy}40` }}>
                        <p className="font-medium italic">Your "Vault" is currently empty.<br/>Fill out the form to print your first card.</p>
                    </div>
                ) : (
                    cardHistory.map((card) => (
                        <div 
                            key={card.id}
                            className="relative group transition-all duration-500 animate-in slide-in-from-right-10"
                        >
                            <div 
                                className="relative bg-white p-10 md:p-16 shadow-2xl border-l-[8px] border-y border-r transition-all hover:translate-x-1"
                                style={{ borderLeftColor: colors.red, borderColor: `${colors.navy}10` }}
                            >
                                <div className="absolute top-0 left-0 w-16 h-full pointer-events-none opacity-[0.03]" 
                                     style={{ background: `linear-gradient(to right, ${colors.brown}, transparent)` }}></div>
                                
                                <div className="mb-8">
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black" style={{ color: colors.wine }}>
                                        For: {card.name}
                                    </span>
                                    <p className="leading-relaxed text-2xl md:text-3xl font-serif italic mt-6" style={{ color: colors.brown }}>
                                        "{card.text}"
                                    </p>
                                </div>
                                
                                <div className="flex justify-between items-center border-t pt-6" style={{ borderColor: `${colors.navy}10` }}>
                                    <span className="text-[10px] font-mono opacity-30" style={{ color: colors.navy }}>
                                        TS_{card.id}
                                    </span>
                                    <Button 
                                        variant="outline"
                                        className="font-bold border-2"
                                        style={{ borderColor: colors.navy, color: colors.navy }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(card.text);
                                        }}
                                    >
                                        <Copy className="mr-2 h-4 w-4" /> Copy
                                    </Button>
                                </div>
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-full h-full -z-10 rounded-lg" style={{ backgroundColor: `${colors.navy}08` }}></div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
}