import React, { useState, useEffect } from "react";
import { User, Mail, Image, Save } from "lucide-react";
import useAuth from '../Provider/useAuth'; 


const CustomCard = ({ children, className = '' }) => (
    <div className={`bg-gray-800 rounded-xl shadow-2xl border border-gray-700 ${className}`}>
        {children}
    </div>
);

const CustomCardHeader = ({ children }) => (
    <div className="p-6 border-b border-gray-700">
        {children}
    </div>
);

const CustomCardTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-indigo-400">{children}</h2>
);

const CustomCardDescription = ({ children }) => (
    <p className="text-sm text-gray-400">{children}</p>
);

const CustomCardContent = ({ children, className = 'p-6' }) => (
    <div className={className}>
        {children}
    </div>
);
const MyProfile = () => {
    
    const { user, updateUserProfile } = useAuth(); 
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const getPhotoUrl = (url) => url || "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
    
   
    useEffect(() => {
        if (user) {
         
            setName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
            alert("Name cannot be empty.");
            return;
        }

        setIsUpdating(true);

        try { await updateUserProfile(user ,name, photoURL); 
            alert("Profile updated successfully!"); 
        } catch (error) {
            console.error("Profile update failed:", error);
            alert("Failed to update profile. Check console for details: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    };
    if (user === null) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                <p className="text-xl text-indigo-400">Loading user data...</p>
            </div>
        );
    }
    if (!user) return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <h1 className="text-2xl font-bold text-red-500">Please log in to view your profile.</h1>
        </div>
    );
    
    return (
        <div className="min-h-screen bg-gray-950 text-white py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-400">
                    👤 My Profile
                </h1>
                <CustomCard className="mb-8">
                    <CustomCardHeader>
                        <CustomCardTitle>Current Information</CustomCardTitle>
                        <CustomCardDescription>View your account details</CustomCardDescription>
                    </CustomCardHeader>
                    <CustomCardContent className="space-y-6">
                      <div className="flex items-center gap-6 p-4 rounded-lg bg-gray-900 shadow-inner border border-gray-700">
                            <img
                                src={getPhotoUrl(user.photoURL)}
                                alt={user.displayName || "User"}
                                className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-md object-cover"
                            />
                            <div>
                                <h3 className="text-2xl font-semibold text-white">{user.displayName || "User Name Not Set"}</h3>
                                <p className="text-gray-400">{user.email}</p>
                            </div>
                        </div>
                     <div className="grid gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50">
                                <User className="h-5 w-5 text-indigo-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">Name</p>
                                    <p className="font-medium text-white">{user.displayName || "Not Set"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50">
                                <Mail className="h-5 w-5 text-teal-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="font-medium text-white">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/50">
                                <Image className="h-5 w-5 text-amber-400" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-400">Photo URL</p>
                                    <p className="font-medium text-white truncate">
                                        {user.photoURL || "Not set"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CustomCardContent>
                </CustomCard>
              <CustomCard>
                    <CustomCardHeader>
                        <CustomCardTitle>Edit Profile</CustomCardTitle>
                        <CustomCardDescription>Update your name and profile picture</CustomCardDescription>
                    </CustomCardHeader>
                    <CustomCardContent>
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                          <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 border border-gray-600"
                                    disabled={isUpdating}
                                />
                            </div>
                           <div className="space-y-2">
                                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-300">Photo URL</label>
                                <input
                                    id="photoURL"
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 border border-gray-600"
                                    disabled={isUpdating}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-3 rounded-xl text-lg font-bold transition shadow-md bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Saving...' : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </form>
                    </CustomCardContent>
                </CustomCard>
            </div>
        </div>
    );
};

export default MyProfile;