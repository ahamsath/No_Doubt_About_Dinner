import { useMemo, useState, useEffect, useRef } from 'react'
import { ShoppingCart, Plus, Minus, Star, Clock, ChefHat, Drumstick, IceCream, Beef, Pizza, Leaf, Fish, Coffee, X } from 'lucide-react'

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
  const [serviceType, setServiceType] = useState<'Individual' | 'Catering'>('Individual')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [instructions, setInstructions] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const isPausedRef = useRef<boolean>(false)
  const resumeTimeoutRef = useRef<number | null>(null)

  // Prevent background scroll when popups are open
  useEffect(() => {
    if (isPopupOpen || isCartOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      
      // Lock body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore body scroll
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        
        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [isPopupOpen, isCartOpen])

  // Auto-scroll marquee using scrollLeft with seamless looping
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const pixelsPerSecond = 84
    const resumeDelayMs = 500

    const step = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now
      const deltaMs = now - lastTimeRef.current
      lastTimeRef.current = now

      if (!isPausedRef.current) {
        const deltaPx = (pixelsPerSecond * deltaMs) / 1000
        let next = container.scrollLeft + deltaPx
        const halfWidth = container.scrollWidth / 2
        if (next >= halfWidth) {
          next -= halfWidth
        }
        container.scrollLeft = next
      }

      animationFrameRef.current = requestAnimationFrame(step)
    }

    const start = () => {
      lastTimeRef.current = null
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = requestAnimationFrame(step)
    }

    const pause = () => {
      isPausedRef.current = true
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }

    const queueResume = () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
      resumeTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false
        lastTimeRef.current = null
      }, resumeDelayMs)
    }

    const onPointerDown = () => pause()
    const onPointerUp = () => queueResume()
    const onWheel = () => pause()
    const onScroll = () => {
      // Keep paused while user is scrolling; resume after inactivity
      queueResume()
    }

    // Attach listeners
    container.addEventListener('pointerdown', onPointerDown, { passive: true })
    container.addEventListener('pointerup', onPointerUp, { passive: true })
    container.addEventListener('touchstart', onPointerDown, { passive: true })
    container.addEventListener('touchend', onPointerUp, { passive: true })
    container.addEventListener('wheel', onWheel, { passive: true })
    container.addEventListener('scroll', onScroll, { passive: true })

    // Kick off after layout
    const t = setTimeout(start, 100)

    return () => {
      clearTimeout(t)
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('touchstart', onPointerDown)
      container.removeEventListener('touchend', onPointerUp)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('scroll', onScroll)
    }
  }, [])

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

  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + qty }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const openItemPopup = (item: MenuItem) => {
    setSelectedItem(item)
    setQuantity(1)
    setInstructions('')
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedItem(null)
    setQuantity(1)
    setInstructions('')
  }

  const addToCartFromPopup = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity)
      closePopup()
    }
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

  const filteredAndSortedItems = useMemo(() => {
    let items = [...menuItems]
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory)
    }
    // Sort by rating first, then by prep time for recommended order
    items.sort((a, b) => {
      const r = b.rating - a.rating
      if (r !== 0) return r
      return parsePrepMinutes(a.prepTime) - parsePrepMinutes(b.prepTime)
    })
    return items
  }, [activeCategory])

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
      <section className="relative flex items-start justify-center bg-gradient-to-b from-stone-100 to-stone-50 px-4 pt-4 sm:pt-6 pb-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
            <img 
              src="/chef-logo.png" 
              alt="Personal Chef Logo" 
              className="mx-auto h-48 w-48 sm:h-72 sm:w-72 lg:h-96 lg:w-96 object-contain"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden bg-stone-200 h-48 w-48 sm:h-72 sm:w-72 lg:h-96 lg:w-96 mx-auto rounded-full flex items-center justify-center">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-bold text-stone-600">Chef</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-2 leading-tight">
          Deliciously Personal. Expertly Catered.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-stone-600 mb-3 sm:mb-4 max-w-2xl mx-auto px-4">
          Home-cooked meals or full event catering—crafted with care by your local chef in Boston & Quincy.
          Choose your meals or plan your event menu now.
          </p>
          
          {/* Individual/Catering Toggle - Main Page */}
          <div className="flex justify-center mb-3 sm:mb-4 px-4">
            <div className="inline-flex bg-stone-200 rounded-full p-1">
              <button
                onClick={() => setServiceType('Individual')}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors ${serviceType === 'Individual' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'}`}
              >
                Individual
              </button>
              <button
                onClick={() => setServiceType('Catering')}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors ${serviceType === 'Catering' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-stone-900'}`}
              >
                Catering
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Categories Bar (fixed) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          {/* Desktop/Tablet: scrollable row */}
          <div className="hidden md:flex gap-4 overflow-x-auto no-scrollbar">
            {iconCategories.map(({ label, value, Icon }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`flex-shrink-0 w-20 h-20 rounded-full transition-colors flex flex-col items-center justify-center gap-1 ${activeCategory === value ? 'bg-stone-900 text-white' : 'bg-transparent text-stone-800 hover:bg-stone-100/50'}`}
              >
                <Icon className="h-8 w-8" />
                <span className="text-xs font-semibold leading-tight">{label}</span>
              </button>
            ))}
          </div>
          {/* Mobile: auto-scrolling loop with pause-on-scroll */}
          <div className="md:hidden">
            <div
              ref={scrollRef}
              className="marquee-outer scrollable-x"
            >
              <div className="marquee-content">
                {[...iconCategories, ...iconCategories].map(({ label, value, Icon }, index) => (
                  <button
                    key={`${value}-${index}`}
                    onClick={() => setActiveCategory(value)}
                    className={`flex-shrink-0 w-[72px] h-[72px] rounded-full transition-colors flex flex-col items-center justify-center gap-1 ${activeCategory === value ? 'bg-stone-900 text-white' : 'bg-transparent text-stone-800 hover:bg-stone-100/50'}`}
                  >
                    <Icon className="h-7 w-7" />
                    <span className="text-xs font-semibold leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="pb-32 sm:pb-36 pt-2 sm:pt-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          

          {/* Section Header */}
          <div className="mt-4 sm:mt-6 mb-3 sm:mb-4 px-2">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">Featured Dishes</h2>
            <p className="text-sm sm:text-base text-stone-600">Inspired by your preferences</p>
          </div>

          {/* Menu Grid - Circular cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {filteredAndSortedItems.map(item => (
              <div key={item.id} className="flex flex-col items-center group cursor-pointer circular-food-item touch-manipulation" onClick={() => openItemPopup(item)}>
                <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg border-3 sm:border-4 border-stone-200 bg-white group-hover:border-stone-300 group-active:border-stone-400 transition-all duration-300 group-hover:scale-105 group-active:scale-95 circular-food-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition-all duration-300 rounded-full" />
                </div>
                <div className="mt-2 sm:mt-3 text-center max-w-full px-1">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-stone-900 line-clamp-2 leading-tight">{item.name}</h3>
                  <div className="mt-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-600">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-400 text-yellow-400" /> {item.rating}
                    </span>
                    <span className="font-semibold text-stone-800 text-sm sm:text-base">${item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Item Details Popup */}
      {isPopupOpen && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closePopup}></div>
          {/* Mobile: Full screen with scroll, Desktop: Centered modal */}
          <div className="absolute inset-x-0 bottom-0 top-auto sm:inset-x-4 sm:top-1/2 sm:bottom-auto sm:transform sm:-translate-y-1/2 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:max-w-lg w-full bg-white rounded-t-3xl sm:rounded-2xl shadow-xl">
            <div className="relative max-h-[90vh] sm:max-h-[85vh] overflow-y-auto popup-scrollable">
              {/* Mobile handle bar */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-stone-300 rounded-full"></div>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 p-3 sm:p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white active:bg-stone-100 transition-colors touch-manipulation"
              >
                <X className="h-6 w-6 sm:h-5 sm:w-5 text-stone-600" />
              </button>
              
              {/* Item Image */}
              <div className="aspect-[4/3] sm:rounded-t-2xl overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Item Details */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex-1 min-w-0 pr-4">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-stone-900 leading-tight">{selectedItem.name}</h2>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2 text-sm sm:text-base text-stone-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {selectedItem.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {selectedItem.prepTime}
                      </span>
                      <span className="text-stone-500 text-sm">{selectedItem.category}</span>
                    </div>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-stone-900 flex-shrink-0">${selectedItem.price}</span>
                </div>
                
                <p className="text-stone-600 mb-6 text-sm sm:text-base leading-relaxed">{selectedItem.description}</p>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-stone-700 mb-3">Quantity</label>
                  <div className="flex items-center justify-center space-x-6 bg-stone-50 rounded-xl p-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 sm:p-2 hover:bg-stone-200 active:bg-stone-300 rounded-full transition-colors touch-manipulation"
                    >
                      <Minus className="h-6 w-6 sm:h-5 sm:w-5 text-stone-600" />
                    </button>
                    <span className="text-2xl sm:text-xl font-bold w-12 text-center text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 sm:p-2 hover:bg-stone-200 active:bg-stone-300 rounded-full transition-colors touch-manipulation"
                    >
                      <Plus className="h-6 w-6 sm:h-5 sm:w-5 text-stone-600" />
                    </button>
                  </div>
                </div>
                
                {/* Special Instructions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Special Instructions (Optional)</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Any special requests or modifications..."
                    className="w-full p-4 sm:p-3 border border-stone-300 rounded-xl resize-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none text-base sm:text-sm"
                    rows={3}
                  />
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={addToCartFromPopup}
                  className="w-full bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white py-4 sm:py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-base sm:text-sm touch-manipulation"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add {quantity} to Cart - ${(selectedItem.price * quantity).toFixed(2)}
                </button>
                
                {/* Mobile safe area */}
                <div className="sm:hidden h-6"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-200">
                <h2 className="text-lg sm:text-xl font-semibold text-stone-800">Your Order</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 sm:p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <Plus className="h-6 w-6 sm:h-5 sm:w-5 rotate-45 text-stone-600" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 popup-scrollable">
                {cartItems.length === 0 ? (
                  <div className="text-center text-stone-500 mt-12">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-stone-300" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 bg-stone-50 p-3 sm:p-4 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-stone-800 text-sm sm:text-base truncate">{item.name}</h4>
                          <p className="text-stone-600 text-sm sm:text-base">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 sm:p-1 hover:bg-stone-200 rounded transition-colors"
                          >
                            <Minus className="h-5 w-5 sm:h-4 sm:w-4 text-stone-600" />
                          </button>
                          <span className="w-8 text-center text-stone-800 text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-2 sm:p-1 hover:bg-stone-200 rounded transition-colors"
                          >
                            <Plus className="h-5 w-5 sm:h-4 sm:w-4 text-stone-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-stone-200 p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base sm:text-lg font-semibold text-stone-800">Total</span>
                    <span className="text-lg sm:text-xl font-bold text-stone-800">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-stone-800 hover:bg-stone-900 text-white py-3 sm:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Fixed Cart Icon - Bottom Right (above bottom bar) */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 bg-stone-900 hover:bg-stone-800 text-white rounded-full p-3 sm:p-4 shadow-xl transition-colors"
      >
        <ShoppingCart className="h-6 w-6 sm:h-6 sm:w-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-medium">
            {getTotalItems()}
          </span>
        )}
      </button>
      </div>
  )
}

export default App
