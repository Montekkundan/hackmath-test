import { getUserData } from "@/db/queries";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const WelcomePage = async () => {
    const userProgressData = getUserData();

    const [
        userData,
    ] = await Promise.all([
        userProgressData,
    ]);
    return (
        <div>
            <Breadcrumb className="mx-auto flex justify-center pt-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/onboarding">Welcome</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/onboarding/grade">Grade</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/onboarding/study">Study</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/onboarding/topics">Topics</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/onboarding/reason">Reason</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/onboarding/success">Success</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <main className="flex-1 flex flex-col items-center justify-center h-[70vh] gap-4">
                <Image
                    src="/ha.svg"
                    alt="Mascot"
                    height={60}
                    width={60}
                    className="hidden lg:block"
                />
                <span className="text-xl">Welcome to onboarding</span>
                <Button size="lg" variant="primary"> 
                <Link href="/onboarding/grade">Get started</Link>
                </Button>
            </main>
        </div>
    )
}

export default WelcomePage