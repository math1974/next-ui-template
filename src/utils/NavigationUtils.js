class NavigationUtils {
    static navigateTo(router, path) {
        if (router.pathname === path) {
            return;
        }

        router.push(path);
    }
}

export default NavigationUtils;