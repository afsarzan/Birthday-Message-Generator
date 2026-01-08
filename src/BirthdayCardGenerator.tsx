import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Cake, PenLine } from "lucide-react";
import { toast } from "sonner"; 

export default function BirthdayCardSplitLayout() {
  const [formData, setFormData] = useState({ name: '', age: '', hobby: '' });
  const [message, setMessage] = useState('');

  // Simple toast notification helper (replace alert)
  const showToast = (msg: string) => {
    // If using Sonner/Shadcn toast: toast.success(msg);
    // Fallback for this example so it runs without dependencies:
    const toastDiv = document.createElement('div');
    toastDiv.className = 'fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded shadow-lg z-50 animate-in slide-in-from-bottom-5';
    toastDiv.innerText = msg;
    document.body.appendChild(toastDiv);
    setTimeout(() => document.body.removeChild(toastDiv), 2000);
  }

  const generateJoke = () => {
    const { name, age, hobby } = formData;
    if (!name && !age && !hobby) {
        showToast("Please enter some details first! 🎂");
        return;
    }

    const safeName = name || "Buddy";
    const safeAge = age || "an undisclosed age";
    const safeHobby = hobby || "doing nothing";

    const jokes = [
      `Happy ${safeAge}th Birthday, ${safeName}! I was going to make a joke about getting older, but I was afraid you'd hit me with your ${safeHobby} gear.`,
      `Congrats on turning ${safeAge}, ${safeName}! You're officially at the age where a "wild night out" means staying up past 10 PM to finish ${safeHobby}.`,
      `${safeName}, you're ${safeAge} now. They say wisdom comes with age. In your case, it seems only an obsession with ${safeHobby} showed up.`,
      `Happy Birthday ${safeName}! You are officially ${safeAge}. That is roughly the same amount of times you've mentioned ${safeHobby} this week alone.`,
      `Don't worry about turning ${safeAge}, ${safeName}. You're still young enough to enjoy ${safeHobby}, but old enough to know you'll need ibuprofen tomorrow if you overdo it.`,
      `Dearest ${safeName}, Happy ${safeAge}th! May your day be filled with joy, cake, and absolutely zero interruptions while you are ${safeHobby}.`
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setMessage(randomJoke);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    showToast("✨ Message copied to clipboard! ✨");
  };

  // Styles
  const festiveBg = "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-purple-100 to-indigo-200";
  const festiveTextGradient = "bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent";
  const festiveAccentBtn = "bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all";

  return (
    // Main container: Flex on small screens, Grid on large screens to create the split view
    <div className={`min-h-screen p-4 md:p-8 flex items-center justify-center ${festiveBg}`}>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch h-full min-h-[500px]">
        
        {/* LEFT COLUMN: INPUT FORM */}
        <Card className="w-full h-full border-purple-100/50 bg-white/90 backdrop-blur-sm shadow-xl relative overflow-hidden flex flex-col">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
          <CardHeader className="space-y-1 pb-2">
            <div className="flex items-center gap-2">
                <Cake className="h-6 w-6 text-purple-600" />
                <CardTitle className={`text-2xl font-bold ${festiveTextGradient}`}>
                    Card Creator
                </CardTitle>
            </div>
            <CardDescription>
              Fill in the blanks to generate some birthday wit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-900 font-medium">Recipient Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Sarah" 
                className="border-purple-200 bg-purple-50/30 focus-visible:ring-purple-400"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-purple-900 font-medium">New Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="30" 
                  className="border-purple-200 bg-purple-50/30 focus-visible:ring-purple-400"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hobby" className="text-purple-900 font-medium">Hobby/Obsession</Label>
                <Input 
                  id="hobby" 
                  placeholder="Crossfit" 
                  className="border-purple-200 bg-purple-50/30 focus-visible:ring-purple-400"
                  value={formData.hobby}
                  onChange={(e) => setFormData({...formData, hobby: e.target.value})}
                />
              </div>
            </div>
            <Button 
              className={`w-full py-6 text-lg font-semibold mt-6 ${festiveAccentBtn}`}
              onClick={generateJoke}
            >
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" /> Write Message ✨
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: THE "INSIDE OF THE CARD" */}
        {/* We style this div to look like physical paper stock with a crease */}
        <div className={`
            relative h-full min-h-[400px] w-full
            bg-[#fffef8] /* Warm off-white paper color */
            rounded-r-xl rounded-l-sm shadow-2xl 
            border-l-[3px] border-stone-200 /* Simulate the card crease/fold */
            p-8 lg:p-12
            flex flex-col justify-between
            transition-all duration-500 ease-in-out
            ${message ? 'opacity-100 translate-x-0' : 'opacity-90 lg:-translate-x-2'}
        `}>
            {/* Paper Texture noise overlay (optional, very subtle) */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <div className="flex-1 flex items-center justify-center">
                {message ? (
                     // The generated message displayed elegantly
                    <div className="animate-in fade-in zoom-in duration-500 text-center">
                         <p className="text-stone-800 leading-loose text-xl md:text-2xl font-serif italic">
                            "{message}"
                         </p>
                    </div>
                ) : (
                    // Placeholder state before generation
                    <div className="text-center text-stone-300 flex flex-col items-center gap-3 animate-pulse">
                        <PenLine className="h-12 w-12 opacity-50" />
                        <p className="text-lg font-serif italic">The inside of the card is waiting for your words...</p>
                    </div>
                )}
            </div>

            {/* Bottom right copy button, only shows when message exists */}
            {message && (
                <div className="flex justify-end mt-8 animate-in fade-in slide-in-from-bottom-4">
                     <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 font-serif" 
                        onClick={copyToClipboard}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Text
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}