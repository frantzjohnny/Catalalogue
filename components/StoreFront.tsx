import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Star, Trash2, MessageCircle, ChevronRight, ChevronLeft, Search, Filter, Heart } from 'lucide-react';
import { Product, CartItem, Slide, SharedStateProps } from '../types';
import { GlassCard, Button, Badge } from './UI';
import { CATEGORIES } from '../constants';

interface StoreFrontProps extends SharedStateProps {
  onAdminClick: () => void;
  addToast: (type: 'success' | 'error', msg: string) => void;
}

export const StoreFront: React.FC<StoreFrontProps> = ({ 
  onAdminClick, 
  products, 
  slides,
  addToast 
}) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sarah_catalogue_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('sarah_catalogue_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Cart Logic ---
  const addToCart = (product: Product, size: string, color: string, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    setCartOpen(true);
    setSelectedProduct(null);
    addToast('success', `${product.name} adicionado ao carrinho!`);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const checkoutWhatsApp = () => {
    const text = cart.map(item => `• ${item.quantity}x ${item.name} (${item.selectedSize}, ${item.selectedColor}) - R$ ${item.price}`).join('\n');
    const total = `\nTotal: R$ ${cartTotal.toFixed(2)}`;
    const msg = encodeURIComponent(`Olá, gostaria de finalizar meu pedido no SARAH CATALOGUE:\n\n${text}${total}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  // --- Filtering ---
  const activeProducts = products.filter(p => p.status === 'active');
  const filteredProducts = activeProducts.filter(p => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-0 bg-[#F9FAFB] font-sans text-gray-900 selection:bg-violet-200 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">S</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">SARAH CATALOGUE</span>
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/50 hover:bg-white text-gray-600 hover:text-violet-600 transition-all shadow-sm border border-gray-100"
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-lg shadow-pink-500/30 animate-in zoom-in">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={onAdminClick} className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <HeroSlider slides={slides.filter(s => s.active)} />

      {/* Filters & Search */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none"
             />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCurrentCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentCategory === cat.id 
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={48} className="text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Nenhum produto encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou busca.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setCurrentCategory('all'); setSearchQuery(''); }}>Limpar Filtros</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <GlassCard 
                key={product.id} 
                className="group overflow-hidden cursor-pointer h-full flex flex-col border-transparent hover:border-violet-200"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {product.isNew && <span className="absolute top-3 left-3 px-2 py-1 bg-violet-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg">Novo</span>}
                  {product.isSale && <span className="absolute top-3 right-3 px-2 py-1 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-lg">Sale</span>}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-violet-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-500">{product.rating}</span>
                  </div>
                  <div className="mt-auto pt-3 border-t border-dashed border-gray-100 flex items-end justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through block">R$ {product.originalPrice.toFixed(2)}</span>
                      )}
                      <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-12 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold">S</div>
                <span className="font-bold text-gray-900 tracking-tight">SARAH CATALOGUE</span>
             </div>
             <p className="text-xs text-gray-500">Moda, estilo e elegância em um só lugar.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Todos os direitos reservados.</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Desenvolvido por <span className="font-semibold text-violet-600 flex items-center gap-1">Johnny Frantz <Heart size={12} className="fill-violet-600" /></span>
            </p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        total={cartTotal}
        onCheckout={checkoutWhatsApp}
      />
    </div>
  );
};

// --- Sub Components ---

const HeroSlider = ({ slides }: { slides: Slide[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-900 overflow-hidden mt-16 group select-none flex-shrink-0">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-center p-6">
            <div className={`transform transition-all duration-700 delay-200 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {slide.badge && (
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest mb-6 animate-pulse">
                  {slide.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                {slide.subtitle}
              </p>
              <Button size="lg" className="hover:scale-105 active:scale-95 shadow-xl shadow-violet-900/20 border border-white/20 backdrop-blur-sm">
                {slide.ctaText} <ChevronRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hidden md:block">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hidden md:block">
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProductDetailModal = ({ product, onClose, onAddToCart }: { product: Product, onClose: () => void, onAddToCart: (p: Product, s: string, c: string, q: number) => void }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition-colors shadow-sm">
          <X size={20} />
        </button>
        
        {/* Gallery Section */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col relative h-[40vh] md:h-auto">
          <div className="flex-1 relative overflow-hidden">
             <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover absolute inset-0 transition-all duration-500" />
          </div>
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all ${activeImg === idx ? 'border-violet-600 scale-110 shadow-lg' : 'border-white/50 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
             <Badge variant="info">{product.category}</Badge>
             <div className="flex items-center gap-1 text-amber-500 ml-auto">
               <Star size={16} fill="currentColor" />
               <span className="text-sm font-bold">{product.rating}</span>
               <span className="text-gray-400 text-xs font-normal">({product.reviews} reviews)</span>
             </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h2>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through mb-1">
                 R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.isSale && (
               <Badge variant="danger" className="mb-2">Promoção</Badge>
            )}
          </div>
          
          <div className="space-y-8 flex-1">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Tamanho</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[44px] h-11 px-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                          selectedSize === size 
                            ? 'bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-900/20' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-violet-500 hover:text-violet-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Cor</label>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-11 h-11 rounded-full border-[3px] flex items-center justify-center transition-all duration-200 ${
                          selectedColor === color ? 'border-violet-600 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                        }`}
                      >
                        <span 
                          className="w-8 h-8 rounded-full border border-black/5 shadow-inner"
                          style={{backgroundColor: color}}
                        />
                      </button>
                    ))}
                  </div>
                </div>
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-gray-100">
               <span className="text-sm font-medium text-gray-700">Quantidade:</span>
               <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1 border border-gray-200">
                 <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                 >
                   -
                 </button>
                 <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                 <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  onClick={() => setQuantity(quantity + 1)}
                 >
                   +
                 </button>
               </div>
            </div>
            
            <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
               <h4 className="text-sm font-bold text-gray-900 mb-2">Descrição</h4>
               <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
          
          <div className="pt-6 mt-6">
            <Button 
              size="lg" 
              fullWidth 
              onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
              className="group h-14 text-lg"
            >
              Adicionar ao Carrinho
              <ShoppingCart size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({ 
  isOpen, onClose, cart, updateQuantity, removeFromCart, total, onCheckout 
}: { 
  isOpen: boolean, onClose: () => void, cart: CartItem[], updateQuantity: (i: number, d: number) => void, removeFromCart: (i: number) => void, total: number, onCheckout: () => void 
}) => {
  return (
    <div className={`fixed inset-0 z-[110] transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-violet-600" />
            <h2 className="font-bold text-lg text-gray-900">Meu Carrinho</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{cart.length}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <ShoppingCart size={32} strokeWidth={1.5} className="opacity-50" />
              </div>
              <p className="font-medium">Seu carrinho está vazio.</p>
              <Button variant="outline" onClick={onClose}>Continuar Comprando</Button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm animate-in slide-in-from-bottom-2 duration-300" style={{animationDelay: `${idx * 50}ms`}}>
                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-100" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full border border-gray-200" style={{backgroundColor: item.selectedColor}} />
                      </span> 
                      <span className="w-px h-3 bg-gray-200" />
                      Tam: {item.selectedSize}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                     <span className="font-bold text-violet-600 text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                     <div className="flex items-center gap-3">
                       <div className="flex items-center gap-1 bg-gray-50 px-1 py-0.5 rounded-lg border border-gray-200">
                         <button onClick={() => updateQuantity(idx, -1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-white shadow-sm rounded-md transition-all">-</button>
                         <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                         <button onClick={() => updateQuantity(idx, 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-white shadow-sm rounded-md transition-all">+</button>
                       </div>
                       <button onClick={() => removeFromCart(idx)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                         <Trash2 size={16} />
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-emerald-600 font-medium">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
               <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2 border-t border-dashed border-gray-100">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={onCheckout} variant="success" fullWidth className="py-4 text-base shadow-emerald-500/30 group">
              <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Finalizar no WhatsApp
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};