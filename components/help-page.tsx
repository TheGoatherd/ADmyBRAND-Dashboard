"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  ExternalLink,
  Star,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleSubmitTicket = () => {
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you within 24 hours.",
    })
  }

  const faqItems = [
    {
      question: "How do I create a new campaign?",
      answer:
        "To create a new campaign, navigate to the Campaigns page and click the 'New Campaign' button. Fill in the required details including campaign name, type, budget, and target audience. You can also set up advanced targeting options and creative assets.",
    },
    {
      question: "How can I track my campaign performance?",
      answer:
        "Campaign performance can be tracked in real-time through the Analytics dashboard. You'll see metrics like impressions, clicks, CTR, conversions, and ROI. You can also set up custom reports and automated alerts for key performance indicators.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through our encrypted payment gateway.",
    },
    {
      question: "How do I invite team members?",
      answer:
        "Go to Settings > Team Management and click 'Invite Member'. Enter their email address and select their role (Admin, Member, or Viewer). They'll receive an invitation email with setup instructions.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, you can export your data in various formats (CSV, PDF, Excel) from any report or analytics page. For bulk data exports, use the 'Export Data' feature in Settings > Advanced.",
    },
    {
      question: "How do I set up API integrations?",
      answer:
        "API keys can be generated in Settings > Security. We provide comprehensive API documentation with examples for common integrations. Our REST API supports all major programming languages.",
    },
    {
      question: "What's included in the Pro plan?",
      answer:
        "The Pro plan includes unlimited campaigns, advanced analytics, team collaboration, API access, priority support, and custom integrations. You also get access to beta features and dedicated account management.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from Settings > Billing. Your account will remain active until the end of your current billing period, and you'll retain access to your data for 30 days after cancellation.",
    },
  ]

  const tutorials = [
    {
      title: "Getting Started with ADmyBRAND",
      description: "Learn the basics of setting up your account and creating your first campaign",
      duration: "5 min",
      type: "video",
      difficulty: "Beginner",
    },
    {
      title: "Advanced Analytics Deep Dive",
      description: "Master the analytics dashboard and create custom reports",
      duration: "12 min",
      type: "video",
      difficulty: "Intermediate",
    },
    {
      title: "Campaign Optimization Strategies",
      description: "Best practices for improving campaign performance and ROI",
      duration: "8 min",
      type: "article",
      difficulty: "Advanced",
    },
    {
      title: "Team Collaboration Features",
      description: "How to effectively manage team members and permissions",
      duration: "6 min",
      type: "video",
      difficulty: "Beginner",
    },
    {
      title: "API Integration Guide",
      description: "Step-by-step guide to integrating with our API",
      duration: "15 min",
      type: "article",
      difficulty: "Advanced",
    },
    {
      title: "Audience Segmentation Techniques",
      description: "Create targeted audience segments for better campaign results",
      duration: "10 min",
      type: "video",
      difficulty: "Intermediate",
    },
  ]

  const supportArticles = [
    {
      title: "Troubleshooting Campaign Issues",
      category: "Campaigns",
      views: 1250,
      helpful: 95,
    },
    {
      title: "Understanding Analytics Metrics",
      category: "Analytics",
      views: 980,
      helpful: 88,
    },
    {
      title: "Billing and Payment FAQ",
      category: "Billing",
      views: 750,
      helpful: 92,
    },
    {
      title: "Account Security Best Practices",
      category: "Security",
      views: 650,
      helpful: 96,
    },
    {
      title: "API Rate Limits and Usage",
      category: "API",
      views: 420,
      helpful: 85,
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">Find answers, tutorials, and get help when you need it</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Documentation
          </Button>
          <Button>
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Documentation</h3>
                <p className="text-sm text-muted-foreground">Comprehensive guides</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Get instant help</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {tutorial.type === "video" ? (
                        <Video className="h-5 w-5 text-blue-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {tutorial.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Support Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportArticles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span>{article.views} views</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{article.helpful}% helpful</span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                    <Badge variant="secondary" className="mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground">support@admybrand.com</p>
                    <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Select a category</option>
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Account Access</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    rows={4}
                  />
                </div>

                <Button onClick={handleSubmitTicket} className="w-full">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Team */}
          <Card>
            <CardHeader>
              <CardTitle>Our Support Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">Sarah Miller</h3>
                  <p className="text-sm text-muted-foreground">Support Manager</p>
                  <p className="text-xs text-muted-foreground mt-1">Specializes in technical issues</p>
                </div>

                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>DJ</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">David Johnson</h3>
                  <p className="text-sm text-muted-foreground">Senior Support Specialist</p>
                  <p className="text-xs text-muted-foreground mt-1">Expert in analytics and reporting</p>
                </div>

                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">Anna Lee</h3>
                  <p className="text-sm text-muted-foreground">Billing Specialist</p>
                  <p className="text-xs text-muted-foreground mt-1">Handles billing and account questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
