import { useRef } from "react";
import { motion } from "framer-motion";

export default function App() {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

    return (
        <motion.div
            ref={ref}
            className="w-24 h-24 bg-blue-500 rounded-full absolute pointer-events-none"
            style={{ x, y }}
        />
    );
}

function useFollowPointer(ref) {
    const [point, setPoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handlePointerMove(event) {
            const rect = ref.current.getBoundingClientRect();
            setPoint({
                x: event.clientX - rect.left - rect.width / 2,
                y: event.clientY - rect.top - rect.height / 2,
            });
        }

        window.addEventListener("pointermove", handlePointerMove);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [ref]);

    return point;
}
