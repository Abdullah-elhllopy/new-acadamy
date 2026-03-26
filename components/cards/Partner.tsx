import { Card, CardContent } from '../ui/card'

const Partner = ({ name }: { name: string }) => {
    return (
        <Card  className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
                <div className="flex items-center justify-center h-24">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">
                                {(name).charAt(0)}
                            </span>
                        </div>
                        <p className="font-semibold text-sm text-foreground">
                            {name}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Partner