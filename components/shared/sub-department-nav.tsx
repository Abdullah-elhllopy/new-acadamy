import { cn } from "@/lib/utils"

interface SubDepartment {
    id: string
    name: string
    nameAr: string
}

interface SubDepartmentNavProps {
    departments: SubDepartment[]
    activeId?: string
    onSelect: (id: string) => void
    className?: string
}

export function SubDepartmentNav({
    departments,
    activeId,
    onSelect,
    className
}: SubDepartmentNavProps) {
    return (
        <div className={cn("bg-hero-bg overflow-x-auto", className)}>
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-1 py-2">
                    {departments.map((dept) => {
                        const isActive = activeId === dept.id


                        return (
                            <button
                                key={dept.id}
                                onClick={() => onSelect(dept.id)}
                                className={cn(
                                    "relative px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                                    isActive
                                        ? "text-white"
                                        : "text-primary-foreground/60 hover:text-white"
                                )}
                            >
                                {dept.nameAr}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
