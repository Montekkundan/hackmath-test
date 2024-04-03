type Props = {
    children: React.ReactNode;
};

const OnboardingLayout = ({ children }: Props) => {

    return (
        <div className="min-h-full flex flex-col">
            {children}
        </div>
    );
};

export default OnboardingLayout;