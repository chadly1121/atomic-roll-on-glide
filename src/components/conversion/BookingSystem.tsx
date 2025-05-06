
import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Available time slots
const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

// Service types
const SERVICES = [
  { id: 'consultation', name: 'Free Consultation', duration: '30 min' },
  { id: 'estimate', name: 'On-site Estimate', duration: '45 min' },
  { id: 'color', name: 'Color Consultation', duration: '60 min' },
];

const BookingSystem = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!date || !selectedTime) {
        toast({
          title: "Missing information",
          description: "Please select both a date and time",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name || !email || !phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to your booking service
    const bookingData = {
      service: SERVICES.find(s => s.id === selectedService)?.name,
      date: date ? format(date, 'MMMM dd, yyyy') : '',
      time: selectedTime,
      name,
      email,
      phone,
      notes
    };
    
    console.log('Booking submitted:', bookingData);
    
    toast({
      title: "Booking request sent!",
      description: "We'll contact you shortly to confirm your appointment.",
    });
    
    // Reset form
    setDate(undefined);
    setSelectedTime(null);
    setSelectedService(SERVICES[0].id);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setStep(1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule a Consultation</CardTitle>
        <CardDescription>
          Book a free consultation with our painting experts
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Service Type</label>
              <div className="grid grid-cols-1 gap-2">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.id)}
                    className={`flex justify-between items-center p-3 border rounded-md hover:border-atomic-turquoise transition-colors ${
                      selectedService === service.id ? 'border-atomic-turquoise bg-atomic-turquoise/10' : 'border-gray-200'
                    }`}
                  >
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border ${
                      selectedService === service.id ? 'border-atomic-turquoise bg-atomic-turquoise' : 'border-gray-300'
                    }`}>
                      {selectedService === service.id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {date && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={`flex items-center justify-center p-2 border rounded-md hover:border-atomic-orange transition-colors ${
                        selectedTime === time ? 'border-atomic-orange bg-atomic-orange/10 text-atomic-orange' : 'border-gray-200'
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Email Address*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Phone Number*</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium">Booking Summary</h3>
            
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span>{SERVICES.find(s => s.id === selectedService)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{date ? format(date, 'MMMM dd, yyyy') : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>{phone}</span>
              </div>
              {notes && (
                <div className="flex flex-col">
                  <span className="text-gray-600">Notes:</span>
                  <span className="text-sm">{notes}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600">
              By submitting this form, you agree to be contacted about your booking request.
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className={`flex ${step > 1 ? 'justify-between' : 'justify-end'}`}>
        {step > 1 && (
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
        )}
        
        {step < 3 ? (
          <Button onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Confirm Booking
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingSystem;
