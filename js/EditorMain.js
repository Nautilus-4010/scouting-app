const router = new FormEditorRouter();
const loginForm = document.querySelector('#login form');
const seasonDashboard = new SeasonDashboardController('#edit-season form');
const seasons = [
    new Season('Freight Frenzy', ['Monterrey']),
    new Season('Rapid React', ['Monterrey'])
]


addListenersToBtns();
addLoginFormHandler();
auth.onAuthStateChanged(handleAuthStatus);
logoutBtn.addEventListener('click', () => auth.signOut())
seasonDashboard.controlDashboard();


function addListenersToBtns() {
    document.getElementById('btn-menu-head').addEventListener('click', function() {
        router.displayPage(router.pages.menu);
    });
}
