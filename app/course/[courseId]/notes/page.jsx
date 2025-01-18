'use client';
import DashHeader from '@/app/dashboard/_components/DashHeader';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Notes = () => {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [step, setStep] = useState(0);

    useEffect(() => {
        GetNotes();
    }, []);

    const GetNotes = async () => {
        try {
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
            });
            const formattedNotes = result?.data?.map(note => ({
                ...note,
                notes: typeof note.notes === 'string' ? 
                    note.notes.replace(/\\n/g, '')  // Remove \n characters
                                .replace(/\\/g, '')   // Remove remaining backslashes
                                .trim() : note.notes
            }));
            setNotes(formattedNotes || []);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleNext = () => {
        if (step < notes.length - 1) {
            setStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    };

    return (
        <div>
            <DashHeader />
            <div className="mx-10 md:mx-36 lg:px-50 mt-10">
                {/* Step Progress Bar */}
                <div className="flex gap-5 items-center">
                    {step > 0 && (
                        <Button onClick={handlePrev} className="bg-gray-300">
                            Prev
                        </Button>
                    )}

                    {notes?.map((_, index) => (
                        <div
                            key={index}
                            className={`w-full h-2 rounded-full ${index <= step ? 'bg-blue-400' : 'bg-gray-400'}`}
                        />
                    ))}

                    {step < notes.length - 1 && (
                        <Button onClick={handleNext} className="bg-blue-500 text-white">
                            Next
                        </Button>
                    )}
                </div>

                {/* Note Content */}
                <div className="mt-5 prose max-w-none">
                    {notes.length > 0 && notes[step]?.notes ? (
                        <div
                        className="chapter-content"
                        dangerouslySetInnerHTML={{ 
                            __html: notes[step]?.notes
                        }}
                        />
                    ) : (
                        <p className="text-gray-500">No notes available for this step.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notes;
