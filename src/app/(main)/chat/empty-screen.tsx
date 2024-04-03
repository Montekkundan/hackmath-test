import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@/components/ui/icons';
import { Fragment } from 'react';

const exampleMessages = [
    {
        heading: 'What is the area of a circle with \nradius 5?',
        message: 'What is the area of a circle with radius 5?',
    },
    {
        heading: 'How do you solve the quadratic  \nequation x^2 - 4x + 4 = 0?',
        message: 'How do you solve the quadratic equation x^2 - 4x + 4 = 0?',
    },
    {
        heading: 'Explain the Pythagorean theorem',
        message: 'Explain the Pythagorean theorem',
    },
];

export function EmptyScreen({
    submitMessage,
}: {
    submitMessage: (message: string) => void;
}) {
    const renderMessageWithBreaks = (message: string, index: any) => (
        message.split('\n').map((line, idx) => (
            <Fragment key={`${index}-${idx}`}>
                {idx > 0 && <br />}
                {line}
            </Fragment>
        ))
    );
    return (
        <div className="sm:mx-auto md:ml-16 max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8 mb-4">
                <h1 className="mb-2 text-lg font-semibold">
                    Dr Ham
                </h1>
                <p className="mb-2 leading-normal text-muted-foreground">

                    I am Dr. Ham, your personal Math teacher. I specialize in breaking down complex Math concepts into understandable terms, using real-world examples to make learning engaging. From arithmetic to calculus, I am here to answer your questions and help you explore the wonders of Math.
                </p>
                <p className="mb-2 leading-normal text-muted-foreground">
                    Let us tackle those Math challenges together and discover how much fun learning can be. Ask away any Math-related questions you have!
                </p>
                <p className="leading-normal text-muted-foreground">Try an example:</p>
                <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
                    {exampleMessages.map((message, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="h-auto text-base "
                            type='submit'
                            onClick={async () => {
                                submitMessage(message.message);
                            }}
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            <span className='inline-flex items-center text-left break-words'> {renderMessageWithBreaks(message.heading, index)}</span>
                        </Button>
                    ))}
                </div>
            </div>
            <p className="leading-normal text-muted-foreground text-[0.8rem] text-center max-w-96 ml-auto mr-auto">
                Note: currenlty in experimental phase.
            </p>
        </div>
    );
}