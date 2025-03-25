import { useState } from "react";
import api from "../../utlis/axios.Config";


const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Nowe hasło i jego potwierdzenie się nie zgadzają");
            return;
        }
    
        try {
            const response = await api.put('/user/change-password', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });
            console.log("🟢 Odpowiedź z serwera:", response.data);
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Błąd zmiany hasła");
        }
    };


    return (
        <div className="relative bg-gray-700 text-white w-full h-full p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">

                {/* Obecne hasło */}
                <label className="flex flex-col text-gray-300 text-sm font-semibold">
                    Current password:
                    <input
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-600 rounded-md outline-none border border-gray-500 focus:border-blue-400 transition duration-200"
                        placeholder="Current password"
                        type="password"
                    />
                </label>

                {/* Nowe hasło */}
                <label className="flex flex-col text-gray-300 text-sm font-semibold">
                    New password:
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-600 rounded-md outline-none border border-gray-500 focus:border-blue-400 transition duration-200"
                        placeholder="New password"
                        type="password"
                    />
                </label>

                {/* Powtórzenie nowego hasła */}
                <label className="flex flex-col text-gray-300 text-sm font-semibold">
                    Confirm new password:
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-600 rounded-md outline-none border border-gray-500 focus:border-blue-400 transition duration-200"
                        placeholder="Confirm password"
                        type="password"
                    />
                </label>

                {/* Przycisk */}
                <div className="flex items-end justify-center">
                    <button 
                        onClick={handleChangePassword}
                        className="mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 w-full">
                        Change Password
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ChangePassword;

  
