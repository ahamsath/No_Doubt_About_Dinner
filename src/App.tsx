import { useMemo, useState } from 'react'
import { ShoppingCart, Plus, Minus, Star, Clock, ChefHat, Drumstick, IceCream, Beef, Pizza, Leaf, Fish, Coffee } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  prepTime: string
}

interface CartItem extends MenuItem {
  quantity: number
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [minRating, setMinRating] = useState<number | null>(null)
  const [maxPrepMinutes, setMaxPrepMinutes] = useState<number | null>(null)
  const [sortKey, setSortKey] = useState<'recommended' | 'rating' | 'price' | 'time'>('recommended')
  const [serviceType, setServiceType] = useState<'Individual' | 'Catering'>('Individual')

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Truffle Risotto",
      description: "Creamy arborio rice with black truffle, parmesan, and fresh herbs",
      price: 28,
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      category: "Main Course",
      rating: 4.8,
      prepTime: "35 min"
    },
    {
      id: 2,
      name: "Seared Duck Breast",
      description: "Pan-seared duck with cherry gastrique and roasted vegetables",
      price: 35,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      category: "Main Course",
      rating: 4.9,
      prepTime: "40 min"
    },
    {
      id: 3,
      name: "Lobster Bisque",
      description: "Rich and creamy lobster soup with cognac and fresh cream",
      price: 18,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      category: "Appetizer",
      rating: 4.7,
      prepTime: "20 min"
    },
    {
      id: 4,
      name: "Chocolate Soufflé",
      description: "Light and airy chocolate soufflé with vanilla ice cream",
      price: 15,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      category: "Dessert",
      rating: 4.9,
      prepTime: "25 min"
    },
    {
      id: 5,
      name: "Beef Wellington",
      description: "Tender beef fillet wrapped in puff pastry with mushroom duxelles",
      price: 45,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      category: "Main Course",
      rating: 4.8,
      prepTime: "50 min"
    },
    {
      id: 6,
      name: "Burrata Salad",
      description: "Fresh burrata with heirloom tomatoes, basil, and balsamic reduction",
      price: 16,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      category: "Appetizer",
      rating: 4.6,
      prepTime: "15 min"
    }
  ]

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      }
      return prev.filter(cartItem => cartItem.id !== id)
    })
  }

  const getTotalItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const parsePrepMinutes = (prep: string) => {
    const match = prep.match(/(\d+)\s*min/)
    return match ? parseInt(match[1], 10) : 0
  }

  const categories = useMemo(() => ['All', ...new Set(menuItems.map(item => item.category))], [])

  const filteredAndSortedItems = useMemo(() => {
    let items = [...menuItems]
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory)
    }
    if (minRating !== null) {
      items = items.filter(i => i.rating >= minRating)
    }
    if (maxPrepMinutes !== null) {
      items = items.filter(i => parsePrepMinutes(i.prepTime) <= maxPrepMinutes)
    }
    items.sort((a, b) => {
      if (sortKey === 'rating') return b.rating - a.rating
      if (sortKey === 'price') return a.price - b.price
      if (sortKey === 'time') return parsePrepMinutes(a.prepTime) - parsePrepMinutes(b.prepTime)
      const r = b.rating - a.rating
      if (r !== 0) return r
      return parsePrepMinutes(a.prepTime) - parsePrepMinutes(b.prepTime)
    })
    return items
  }, [activeCategory, minRating, maxPrepMinutes, sortKey])

  const iconCategories = useMemo(() => ([
    { label: 'All', value: 'All', Icon: ChefHat },
    { label: 'Chicken', value: 'Chicken', Icon: Drumstick },
    { label: 'Beef', value: 'Beef', Icon: Beef },
    { label: 'Italian', value: 'Italian', Icon: Pizza },
    { label: 'Vegetarian', value: 'Vegetarian', Icon: Leaf },
    { label: 'Seafood', value: 'Seafood', Icon: Fish },
    { label: 'Desserts', value: 'Dessert', Icon: IceCream },
    { label: 'Coffee', value: 'Coffee', Icon: Coffee },
  ]), [])

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section with Logo */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="text-center">
          <div className="mb-8">
            <img 
              src="/chef-logo.png" 
              alt="Personal Chef Logo" 
              className="mx-auto h-96 w-96 object-contain"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden bg-stone-200 h-96 w-96 mx-auto rounded-full flex items-center justify-center">
              <span className="text-7xl font-bold text-stone-600">Chef</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-4">
            No Doubt About Dinner
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
            Exquisite personal chef experiences delivered to your door. 
            Crafted with passion, served with excellence.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="pb-20 pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Sticky Category Row (DoorDash-style) */}
          <div className="sticky top-0 z-40 bg-stone-50">
            <div className="py-2">
              {/* Category Icons Row with Toggle */}
              <div className="-mx-2 px-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar">
                    {iconCategories.map(({ label, value, Icon }) => (
                      <button
                        key={value}
                        onClick={() => setActiveCategory(value)}
                        className={`flex-shrink-0 w-20 h-20 rounded-2xl transition-colors flex flex-col items-center justify-center gap-1 ${activeCategory === value ? 'bg-stone-900 text-white' : 'bg-transparent text-stone-800 hover:bg-stone-100/50'}`}
                      >
                        <Icon className="h-8 w-8" />
                        <span className="text-xs font-semibold leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Individual/Catering Toggle */}
                  <div className="flex-shrink-0 bg-stone-200 rounded-full p-1">
                    <button
                      onClick={() => setServiceType('Individual')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${serviceType === 'Individual' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'}`}
                    >
                      Individual
                    </button>
                    <button
                      onClick={() => setServiceType('Catering')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${serviceType === 'Catering' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'}`}
                    >
                      Catering
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section Header */}
          <div className="mt-6 mb-4">
            <h2 className="text-2xl font-bold text-stone-900">Featured Dishes</h2>
            <p className="text-stone-600">Inspired by your preferences</p>
          </div>

          {/* Menu Grid - Merchant style cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems.map(item => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-full text-xs text-stone-800 font-medium flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {item.prepTime}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="absolute bottom-3 right-3 bg-stone-900 text-white rounded-full p-2 shadow-md hover:bg-stone-800 transition-colors"
                    aria-label="Add to cart"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-stone-900">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-3 text-sm text-stone-600">
                        <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {item.rating}</span>
                        <span>{item.category}</span>
                        <span className="font-medium text-stone-800">${item.price}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-stone-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-stone-200">
                <h2 className="text-xl font-semibold text-stone-800">Your Order</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <Plus className="h-5 w-5 rotate-45 text-stone-600" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center text-stone-500 mt-12">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-stone-300" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 bg-stone-50 p-4 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800">{item.name}</h4>
                          <p className="text-stone-600">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-stone-200 rounded transition-colors"
                          >
                            <Minus className="h-4 w-4 text-stone-600" />
                          </button>
                          <span className="w-8 text-center text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 hover:bg-stone-200 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4 text-stone-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-stone-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-stone-800">Total</span>
                    <span className="text-xl font-bold text-stone-800">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-lg font-medium transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Fixed Cart Icon - Bottom Right */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-6 right-6 z-50 bg-stone-900 hover:bg-stone-800 text-white rounded-full p-4 shadow-xl transition-colors"
      >
        <ShoppingCart className="h-6 w-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
            {getTotalItems()}
          </span>
        )}
      </button>
      </div>
  )
}

export default App
