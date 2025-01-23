import {
    Home,
    Menu,
    Login,
    ChatScreen,
} from "../components/screens/index"
import NAVIGATION from "./navigation"



const screens = [
    { name: NAVIGATION.HOME, component: Home },
    { name: NAVIGATION.MENU, component: Menu },
    { name: NAVIGATION.LOGIN, component: Login },
    { name: NAVIGATION.CHAT_SCREEN, component: ChatScreen },
];

export default Routes = (Stack) => {
    return (
        <>
            {
                screens.map((comp) => (
                    <Stack.Screen  key={comp.name}  name={comp.name} component={comp.component} />
                ))
            }
        </>
    )
}