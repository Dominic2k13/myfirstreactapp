"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Trophy,
  Home,
  Gamepad2,
  Users,
  MessageSquare,
  Settings,
  Plus,
  ThumbsUp,
  MessageCircle,
  Target,
  Flame,
  Zap,
  Award,
  Timer,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function Component() {
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false)
  const [achievementText, setAchievementText] = useState("")
  const [selectedAchievementType, setSelectedAchievementType] = useState<string | null>(null)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      achievements: true,
      challenges: true,
      comments: true,
      friendRequests: true,
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
      allowChallenges: true,
    },
    appearance: {
      theme: "dark",
      language: "english",
    },
    study: {
      dailyGoal: 60,
      reminderTime: "18:00",
      subjects: ["Mathematics", "Physics", "Chemistry"],
    },
  })

  const handlePostAchievement = () => {
    console.log("Achievement posted:", {
      text: achievementText,
      type: selectedAchievementType,
    })
    setAchievementText("")
    setSelectedAchievementType(null)
    setIsAchievementModalOpen(false)
  }

  const handleSettingsChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-gray-800 p-4 space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Find classmates..."
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
              <Home className="w-5 h-5 mr-3" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
              <Gamepad2 className="w-5 h-5 mr-3" />
              Games
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
              <Users className="w-5 h-5 mr-3" />
              Friends
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
              <MessageSquare className="w-5 h-5 mr-3" />
              Messages
            </Button>
          </nav>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-300">ONLINE FRIENDS</h3>
              <span className="text-xs text-gray-500">12</span>
            </div>
            <div className="space-y-3">
              {[
                { name: "PhysicsPro", status: "Solving JAMB", subject: "Physics", avatar: "PP" },
                { name: "BioGenius", status: "Mastered", subject: "Biology Unit 3", avatar: "BG" },
                { name: "Mathlete", status: "Practicing", subject: "Algebra", avatar: "ML" },
                { name: "ChemWiz", status: "Online", subject: "", avatar: "CW" },
                { name: "HistoryPro", status: "Studying WWII", subject: "", avatar: "HP" },
              ].map((friend, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback className="bg-green-600 text-white text-xs">{friend.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{friend.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {friend.status} {friend.subject}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                  >
                    Challenge
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">STUDY GROUPS</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-gray-500">#</span>
                <span>#JAMB-Chemistry</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="text-gray-500">#</span>
                <span>#SSCE-Maths</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Social Feed</h1>
            <Dialog open={isAchievementModalOpen} onOpenChange={setIsAchievementModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Achievement
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Share Your Achievement</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div>
                    <Textarea
                      placeholder="What did you accomplish today? (e.g. 'Scored 85% in JAMB Physics mock test')"
                      value={achievementText}
                      onChange={(e) => setAchievementText(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px] resize-none"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Select Achievement Type:</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setSelectedAchievementType("high-score")}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                          selectedAchievementType === "high-score"
                            ? "border-blue-500 bg-blue-500/20"
                            : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        <Trophy className="w-8 h-8 mb-2" />
                        <span className="text-sm">High Score</span>
                      </button>
                      <button
                        onClick={() => setSelectedAchievementType("study-streak")}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                          selectedAchievementType === "study-streak"
                            ? "border-blue-500 bg-blue-500/20"
                            : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        <Flame className="w-8 h-8 mb-2" />
                        <span className="text-sm">Study Streak</span>
                      </button>
                      <button
                        onClick={() => setSelectedAchievementType("speed-run")}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                          selectedAchievementType === "speed-run"
                            ? "border-blue-500 bg-blue-500/20"
                            : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        <Zap className="w-8 h-8 mb-2" />
                        <span className="text-sm">Speed Run</span>
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={handlePostAchievement}
                    disabled={!achievementText.trim() || !selectedAchievementType}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Achievement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback className="bg-purple-600 text-white">MW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">MathWizard</h3>
                      <Badge variant="secondary" className="bg-yellow-600 text-yellow-100">
                        High Score
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">2 hours ago</p>
                    <p className="text-white mb-4">
                      Just scored 95% in the JAMB Mathematics practice test! Who can beat this?
                    </p>
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        24
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />8
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <Target className="w-4 h-4 mr-2" />
                        Challenge
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ml-16 p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-green-600 text-white text-xs">SQ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-white">ScienceQueen</span>{" "}
                        <span className="text-gray-300">Impressive! But I'll beat that tomorrow 😉</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback className="bg-red-600 text-white">HB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">HistoryBuff</h3>
                      <Badge variant="secondary" className="bg-orange-600 text-orange-100">
                        <Flame className="w-3 h-3 mr-1" />
                        7-day Streak
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">5 hours ago</p>
                    <p className="text-white mb-4">
                      Completed my 7th consecutive day of studying for SSCE History! The key is consistency.
                    </p>
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        16
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />3
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <Target className="w-4 h-4 mr-2" />
                        Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback className="bg-blue-600 text-white">CP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">ChemPro</h3>
                      <Badge variant="secondary" className="bg-green-600 text-green-100">
                        New Achievement
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">1 day ago</p>
                    <p className="text-white mb-4">
                      Finally mastered Organic Chemistry! Ready to tackle any JAMB question now 🧪
                    </p>
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        32
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        12
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <Target className="w-4 h-4 mr-2" />
                        Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-800 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Profile</h2>
            <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Profile Settings</h3>
                    <div className="space-y-4 pl-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Profile Visibility</p>
                          <p className="text-sm text-gray-400">Who can see your profile</p>
                        </div>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => handleSettingsChange("privacy", "profileVisibility", e.target.value)}
                          className="bg-gray-700 border-gray-600 rounded px-3 py-1 text-white"
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show Online Status</p>
                          <p className="text-sm text-gray-400">Let others see when you're online</p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingsChange("privacy", "showOnlineStatus", !settings.privacy.showOnlineStatus)
                          }
                          className={`w-12 h-6 rounded-full transition-colors ${
                            settings.privacy.showOnlineStatus ? "bg-blue-600" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              settings.privacy.showOnlineStatus ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Allow Challenges</p>
                          <p className="text-sm text-gray-400">Let friends challenge you to competitions</p>
                        </div>
                        <button
                          onClick={() =>
                            handleSettingsChange("privacy", "allowChallenges", !settings.privacy.allowChallenges)
                          }
                          className={`w-12 h-6 rounded-full transition-colors ${
                            settings.privacy.allowChallenges ? "bg-blue-600" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              settings.privacy.allowChallenges ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-green-400">Notifications</h3>
                    <div className="space-y-4 pl-4">
                      {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                            <p className="text-sm text-gray-400">Get notified about {key.toLowerCase()}</p>
                          </div>
                          <button
                            onClick={() => handleSettingsChange("notifications", key, !value)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              value ? "bg-green-600" : "bg-gray-600"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                value ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">Study Preferences</h3>
                    <div className="space-y-4 pl-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Daily Study Goal</p>
                          <p className="text-sm text-gray-400">Minutes per day</p>
                        </div>
                        <input
                          type="number"
                          value={settings.study.dailyGoal}
                          onChange={(e) => handleSettingsChange("study", "dailyGoal", Number.parseInt(e.target.value))}
                          className="bg-gray-700 border-gray-600 rounded px-3 py-1 text-white w-20"
                          min="15"
                          max="480"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Study Reminder</p>
                          <p className="text-sm text-gray-400">Daily reminder time</p>
                        </div>
                        <input
                          type="time"
                          value={settings.study.reminderTime}
                          onChange={(e) => handleSettingsChange("study", "reminderTime", e.target.value)}
                          className="bg-gray-700 border-gray-600 rounded px-3 py-1 text-white"
                        />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Favorite Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"].map(
                            (subject) => (
                              <button
                                key={subject}
                                onClick={() => {
                                  const newSubjects = settings.study.subjects.includes(subject)
                                    ? settings.study.subjects.filter((s) => s !== subject)
                                    : [...settings.study.subjects, subject]
                                  handleSettingsChange("study", "subjects", newSubjects)
                                }}
                                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                  settings.study.subjects.includes(subject)
                                    ? "bg-yellow-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                              >
                                {subject}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">Appearance</h3>
                    <div className="space-y-4 pl-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Theme</p>
                          <p className="text-sm text-gray-400">Choose your preferred theme</p>
                        </div>
                        <select
                          value={settings.appearance.theme}
                          onChange={(e) => handleSettingsChange("appearance", "theme", e.target.value)}
                          className="bg-gray-700 border-gray-600 rounded px-3 py-1 text-white"
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Language</p>
                          <p className="text-sm text-gray-400">Interface language</p>
                        </div>
                        <select
                          value={settings.appearance.language}
                          onChange={(e) => handleSettingsChange("appearance", "language", e.target.value)}
                          className="bg-gray-700 border-gray-600 rounded px-3 py-1 text-white"
                        >
                          <option value="english">English</option>
                          <option value="hausa">Hausa</option>
                          <option value="yoruba">Yoruba</option>
                          <option value="igbo">Igbo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-400">Account</h3>
                    <div className="space-y-3 pl-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        Export My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        Deactivate Account
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <Button
                      onClick={() => {
                        console.log("Settings saved:", settings)
                        setIsSettingsModalOpen(false)
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Save Settings
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="bg-blue-600 text-white text-xl">JC</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold mb-1">JAMBChampion</h3>
            <p className="text-sm text-gray-400 mb-4">Aspiring medical student | JAMB 2024</p>
            <Button variant="outline" size="sm" className="mb-4 bg-transparent">
              Change Photo
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">245</p>
              <p className="text-xs text-gray-400">Battles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">78%</p>
              <p className="text-xs text-gray-400">Win Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-xs text-gray-400">Achievements</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Recent Achievements</h4>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Timer className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">View Full Profile</Button>
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
              Share Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
