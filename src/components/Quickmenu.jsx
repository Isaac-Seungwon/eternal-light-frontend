import './Quickmenu.css';

const Quickmenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 800 });

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleDrag = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    return (
        <div
            className="quick-menu"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={(e) => {
                e.preventDefault();
                document.addEventListener('mousemove', handleDrag);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', handleDrag);
                });
            }}
        >
            <div className="circle-button" onClick={toggleMenu}>
                ☰
            </div>
            {menuOpen && (
                <div className="menu-items">
                    <span className="menu-item">🏠 Home</span>
                    <span className="menu-item">📅 Calendar</span>
                    <span className="menu-item">⚙️ Settings</span>
                </div>
            )}
        </div>
    );
};

export default Quickmenu;
