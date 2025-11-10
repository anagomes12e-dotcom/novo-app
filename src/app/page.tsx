'use client'

import { useState, useEffect } from 'react'
import { Baby, User, Calendar, Activity, Brain, AlertTriangle, Stethoscope, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Child {
  name: string
  gender: 'male' | 'female'
  birthDate: string
  weight: number
  height: number
}

export default function BabyTracker() {
  const [child, setChild] = useState<Child | null>(null)
  const [currentStep, setCurrentStep] = useState<'setup' | 'dashboard'>('setup')
  const [themeColor, setThemeColor] = useState('bg-yellow-50')

  // Dados do formulário
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [birthDate, setBirthDate] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  // Atualizar cor do tema baseado no gênero
  useEffect(() => {
    if (gender === 'female') {
      setThemeColor('bg-purple-50')
    } else if (gender === 'male') {
      setThemeColor('bg-blue-50')
    } else {
      setThemeColor('bg-yellow-50')
    }
  }, [gender])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && gender && birthDate && weight && height) {
      const newChild: Child = {
        name,
        gender: gender as 'male' | 'female',
        birthDate,
        weight: parseFloat(weight),
        height: parseFloat(height)
      }
      setChild(newChild)
      setCurrentStep('dashboard')
    }
  }

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - birth.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) {
      return `${diffDays} dias`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} ${months === 1 ? 'mês' : 'meses'}`
    } else {
      const years = Math.floor(diffDays / 365)
      const remainingMonths = Math.floor((diffDays % 365) / 30)
      return `${years} ${years === 1 ? 'ano' : 'anos'}${remainingMonths > 0 ? ` e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}` : ''}`
    }
  }

  if (currentStep === 'setup') {
    return (
      <div className={`min-h-screen ${themeColor} transition-colors duration-500 p-4`}>
        <div className="max-w-md mx-auto pt-8">
          <div className="text-center mb-8">
            <Baby className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">BabyTracker</h1>
            <p className="text-gray-600">Acompanhe o crescimento do seu pequeno</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-center">Cadastro da Criança</CardTitle>
              <CardDescription className="text-center">
                Vamos começar conhecendo seu bebê
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome da criança</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite o nome"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="male">Masculino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="birthDate">Data de nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Peso atual (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="3.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Altura atual (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="50"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Começar Acompanhamento
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${themeColor} transition-colors duration-500`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Baby className="w-8 h-8 text-gray-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">{child?.name}</h1>
                <p className="text-sm text-gray-600">
                  {child?.birthDate && calculateAge(child.birthDate)}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentStep('setup')}
            >
              Editar Perfil
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Peso Atual</p>
                  <p className="text-2xl font-bold">{child?.weight} kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Altura Atual</p>
                  <p className="text-2xl font-bold">{child?.height} cm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Próxima Consulta</p>
                  <p className="text-lg font-semibold">Em 5 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Stethoscope className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">Consultas</h3>
              <p className="text-sm text-gray-600">Agende e acompanhe consultas médicas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">Vacinas</h3>
              <p className="text-sm text-gray-600">Calendário de vacinação completo</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Scale className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">Crescimento</h3>
              <p className="text-sm text-gray-600">Acompanhe peso e altura</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="font-semibold mb-2">Desenvolvimento</h3>
              <p className="text-sm text-gray-600">Marcos do desenvolvimento</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h3 className="font-semibold mb-2">Emergências</h3>
              <p className="text-sm text-gray-600">Guia de primeiros socorros</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 mx-auto mb-4 text-teal-500" />
              <h3 className="font-semibold mb-2">Sintomas</h3>
              <p className="text-sm text-gray-600">Questionário diário</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
              <h3 className="font-semibold mb-2">Dicas</h3>
              <p className="text-sm text-gray-600">Orientações por idade</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">IA Assistente</h3>
              <p className="text-sm text-gray-600">Tire suas dúvidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 text-left justify-start bg-blue-500 hover:bg-blue-600">
              <Calendar className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Registrar Peso/Altura</p>
                <p className="text-sm opacity-90">Atualizar medidas</p>
              </div>
            </Button>

            <Button className="h-16 text-left justify-start bg-green-500 hover:bg-green-600">
              <Activity className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Questionário Diário</p>
                <p className="text-sm opacity-90">Como está hoje?</p>
              </div>
            </Button>

            <Button className="h-16 text-left justify-start bg-purple-500 hover:bg-purple-600">
              <Brain className="w-6 h-6 mr-3" />
              <div>
                <p className="font-semibold">Conversar com IA</p>
                <p className="text-sm opacity-90">Tire suas dúvidas</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}