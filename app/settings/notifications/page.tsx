'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function NotificationSettingsPage() {
  const [userSettings, setUserSettings] = useState({
    smsApiKey: '',
    smsApiSecret: '',
    telegramBotToken: '',
    telegramChatId: '',
    enableSmsNotifications: false,
    enableTelegramNotifications: false,
  })

  const [employeeSettings, setEmployeeSettings] = useState({
    smsApiKey: '',
    smsApiSecret: '',
    telegramBotToken: '',
    telegramChatId: '',
    enableSmsNotifications: false,
    enableTelegramNotifications: false,
  })

  const handleUserSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setUserSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleEmployeeSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setEmployeeSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSaveSettings = (type: 'user' | 'employee') => {
    // Here you would typically send the settings to your backend
    console.log(`Saving ${type} settings:`, type === 'user' ? userSettings : employeeSettings)
    // Implement your save logic here
  }

  const NotificationForm = ({ settings, onChange, onSave, type }: { 
    settings: typeof userSettings, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    onSave: () => void,
    type: 'user' | 'employee'
  }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>SMS API Settings</CardTitle>
          <CardDescription>Configure your SMS API for sending notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${type}EnableSms`} className="flex flex-col space-y-1">
              <span>Enable SMS Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Turn on to send notifications via SMS
              </span>
            </Label>
            <Switch 
              id={`${type}EnableSms`}
              name="enableSmsNotifications"
              checked={settings.enableSmsNotifications}
              onCheckedChange={(checked) => onChange({ target: { name: 'enableSmsNotifications', type: 'checkbox', checked } } as any)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${type}SmsApiKey`}>SMS API Key</Label>
            <Input
              id={`${type}SmsApiKey`}
              name="smsApiKey"
              value={settings.smsApiKey}
              onChange={onChange}
              placeholder="Enter your SMS API key"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${type}SmsApiSecret`}>SMS API Secret</Label>
            <Input
              id={`${type}SmsApiSecret`}
              name="smsApiSecret"
              type="password"
              value={settings.smsApiSecret}
              onChange={onChange}
              placeholder="Enter your SMS API secret"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Telegram API Settings</CardTitle>
          <CardDescription>Configure your Telegram Bot for sending notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${type}EnableTelegram`} className="flex flex-col space-y-1">
              <span>Enable Telegram Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Turn on to send notifications via Telegram
              </span>
            </Label>
            <Switch 
              id={`${type}EnableTelegram`}
              name="enableTelegramNotifications"
              checked={settings.enableTelegramNotifications}
              onCheckedChange={(checked) => onChange({ target: { name: 'enableTelegramNotifications', type: 'checkbox', checked } } as any)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${type}TelegramBotToken`}>Telegram Bot Token</Label>
            <Input
              id={`${type}TelegramBotToken`}
              name="telegramBotToken"
              value={settings.telegramBotToken}
              onChange={onChange}
              placeholder="Enter your Telegram Bot Token"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${type}TelegramChatId`}>Telegram Chat ID</Label>
            <Input
              id={`${type}TelegramChatId`}
              name="telegramChatId"
              value={settings.telegramChatId}
              onChange={onChange}
              placeholder="Enter your Telegram Chat ID"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Save {type === 'user' ? 'User' : 'Employee'} Settings</Button>
    </form>
  )

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Notification Settings</h1>
      <Tabs defaultValue="user" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user">User Notifications</TabsTrigger>
          <TabsTrigger value="employee">Employee Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <NotificationForm 
            settings={userSettings} 
            onChange={handleUserSettingsChange} 
            onSave={() => handleSaveSettings('user')}
            type="user"
          />
        </TabsContent>
        <TabsContent value="employee">
          <NotificationForm 
            settings={employeeSettings} 
            onChange={handleEmployeeSettingsChange} 
            onSave={() => handleSaveSettings('employee')}
            type="employee"
          />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}

