import { useState } from "react";
import api from "../../utlis/axios.Config";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirmation do not match");
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
            console.log("🟢 Server response:", response.data);
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Error changing password");
        }
    };

    return (
        <div className="relative bg-gray-700 text-white w-full h-full p-6 rounded-lg shadow-md opacity-0 animate-slide-up">
            <div className="grid grid-cols-2 gap-4">

                {/* Current password */}
                <label className="flex flex-col text-gray-300 text-sm font-semibold">
                    Current password:
                    <input
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-600 rounded-md outline-none border border-gray-500 focus:border-blue-400 transition duration-200"
                        placeholder="Current password"
                        type="password"
                    />
                </label>

                {/* New password */}
                <label className="flex flex-col text-gray-300 text-sm font-semibold">
                    New password:
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-600 rounded-md outline-none border border-gray-500 focus:border-blue-400 transition duration-200"
                        placeholder="New password"
                        type="password"
                    />
                </label>

                {/* Confirm new password */}
                <label className="flex flex-col text-gray-300 text-sm font-semibold">
                    Confirm new password:
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-600 rounded-md outline-none border border-gray-500 focus:border-blue-400 transition duration-200"
                        placeholder="Confirm password"
                        type="password"
                    />
                </label>

                {/* Button */}
                <div className="flex items-end justify-center">
                    <button
                        onClick={handleChangePassword}
                        className="mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 w-full cursor-pointer">
                        Change Password
                    </button>
                </div>

            </div>

            {/* Display message */}
            {message && (
                <div className="mt-4 text-center text-sm text-yellow-400">
                    {message}
                </div>
            )}
        </div>
    );
}

export default ChangePassword;


  
