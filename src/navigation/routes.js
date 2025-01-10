import {
    Home,
    Menu
} from "../components/screens/index"
import NAVIGATION from "./navigation"

const screens = [
    { name: NAVIGATION.Home, component: Home },
    { name: NAVIGATION.Menu, component: Menu },
]

export default Routes = () => {
    return (
        <>
            {
                screens.map((comp) => (
                    <Stack.Screen name={comp.name} component={comp.component} />
                ))
            }
        </>
    )
}