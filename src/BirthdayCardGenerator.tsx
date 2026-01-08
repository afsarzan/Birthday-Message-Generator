import { useState } from 'react';
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { Label } from '@radix-ui/react-label';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
import { Input } from './components/ui/input';

export default function BirthdayGenerator() {
  const [formData, setFormData] = useState({ name: '', age: '', hobby: '' });
  const [message, setMessage] = useState('');

  const generateJoke = () => {
    const { name, age, hobby } = formData;
    if (!name || !age || !hobby) return;

    const jokes = [
      `Happy ${age}th Birthday, ${name}! I was going to make a joke about you getting old, but I was afraid you'd hit me with your ${hobby} equipment.`,
      `Congrats on turning ${age}, ${name}! You're now at the age where "happy hour" is a nap. At least you still have ${hobby} to keep you busy!`,
      `${name}, you're ${age} now. They say wisdom comes with age, but in your case, it looks like only an obsession with ${hobby} showed up.`,
      `Happy Birthday ${name}! You're officially ${age}. That's roughly the same amount of times you've told us how much you love ${hobby} this week.`,
      `Don't worry about turning ${age}, ${name}. You're still young enough to enjoy ${hobby}, but old enough to know better than to do it without stretching first.`
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setMessage(randomJoke);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-none bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Birthday Card Helper</CardTitle>
          <CardDescription>Enter details to generate a funny message.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Person's Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. Sarah" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="25" 
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hobby">Hobby</Label>
              <Input 
                id="hobby" 
                placeholder="Gardening" 
                value={formData.hobby}
                onChange={(e) => setFormData({...formData, hobby: e.target.value})}
              />
            </div>
          </div>
          <Button 
            className="w-full mt-2" 
            onClick={generateJoke}
            disabled={!formData.name || !formData.age || !formData.hobby}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Generate Message
          </Button>
        </CardContent>

        {message && (
          <CardFooter className="flex flex-col items-start bg-slate-50 p-6 rounded-b-lg border-t">
            <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Result:</p>
            <p className="text-slate-800 leading-relaxed italic">"{message}"</p>
            <div className="flex gap-2 mt-4 w-full">
              <Button variant="outline" size="sm" className="flex-1" onClick={copyToClipboard}>
                <Copy className="mr-2 h-3 w-3" /> Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={generateJoke}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}