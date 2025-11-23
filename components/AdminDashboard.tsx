import React, { useState } from 'react';
import { LayoutDashboard, Package, Image as ImageIcon, ShoppingBag, Settings, LogOut, Search, Plus, Trash2, Edit2, TrendingUp, DollarSign, Users, X, Upload } from 'lucide-react';
import { GlassCard, Button, Input, Badge, Modal } from './UI';
import { Product, Slide, AdminTab, SharedStateProps } from '../types';
import { CATEGORIES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

interface AdminDashboardProps extends SharedStateProps {
  onLogout: () => void;
  addToast: (type: 'success' | 'error', msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, products, setProducts, slides, setSlides, addToast }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');

  const renderContent = () => {
    switch (activeTab) {
      case 'OVERVIEW': return <OverviewTab products={products} />;
      case 'PRODUCTS': return <ProductsTab products={products} setProducts={setProducts} addToast={addToast} />;
      case 'SLIDER': return <SliderTab slides={slides} setSlides={setSlides} addToast={addToast} />;
      default: return <OverviewTab products={products} />;
    }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: AdminTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === tab 
          ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white font-medium shadow-md' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-8 border-b border-gray-100">
           <div className="flex items-center gap-3 text-gray-900 font-bold text-2xl tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center text-white text-lg shadow-lg">S</div>
            <div className="flex flex-col">
              <span className="leading-none">SARAH</span>
              <span className="text-sm font-normal text-gray-500">CATALOGUE</span>
            </div>
           </div>
           <span className="text-xs text-gray-400 mt-2 block font-medium uppercase tracking-wider pl-1">Painel Administrativo</span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <NavItem tab="OVERVIEW" icon={LayoutDashboard} label="Visão Geral" />
          <NavItem tab="PRODUCTS" icon={Package} label="Produtos" />
          <NavItem tab="SLIDER" icon={ImageIcon} label="Slider Hero" />
          <NavItem tab="CATEGORIES" icon={ShoppingBag} label="Pedidos" />
          <NavItem tab="SETTINGS" icon={Settings} label="Configurações" />
        </nav>

        <div className="p-6 border-t border-gray-100">
           <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-medium">
             <LogOut size={20} />
             <span>Sair do Sistema</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
           <span className="font-bold text-lg">SARAH CATALOGUE Admin</span>
           <button onClick={onLogout}><LogOut size={20} className="text-gray-500" /></button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

// --- Tabs ---

const OverviewTab = ({ products }: { products: Product[] }) => {
  const data = [
    { name: 'Seg', val: 4000 },
    { name: 'Ter', val: 3000 },
    { name: 'Qua', val: 5000 },
    { name: 'Qui', val: 2780 },
    { name: 'Sex', val: 6890 },
    { name: 'Sab', val: 8390 },
    { name: 'Dom', val: 7490 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bem-vindo de volta ao painel de controle.</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500 mb-1">Receita Mensal</p>
             <h3 className="text-3xl font-bold text-gray-900">R$ 12.4K</h3>
             <span className="text-xs text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">+15% este mês</span>
           </div>
           <div className="p-4 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
             <DollarSign size={24} />
           </div>
        </GlassCard>
         <GlassCard className="p-6 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500 mb-1">Produtos Ativos</p>
             <h3 className="text-3xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</h3>
             <span className="text-xs text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block">Total do catálogo</span>
           </div>
           <div className="p-4 bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-200">
             <Package size={24} />
           </div>
        </GlassCard>
         <GlassCard className="p-6 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500 mb-1">Visitas Hoje</p>
             <h3 className="text-3xl font-bold text-gray-900">1.2K</h3>
             <span className="text-xs text-purple-500 font-bold bg-purple-50 px-2 py-0.5 rounded-full mt-2 inline-block">+5% vs ontem</span>
           </div>
           <div className="p-4 bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white rounded-2xl shadow-lg shadow-purple-200">
             <Users size={24} />
           </div>
        </GlassCard>
      </div>

      {/* Chart */}
      <GlassCard className="p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Vendas da Semana</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip 
                contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                itemStyle={{color: '#8B5CF6', fontWeight: 'bold'}}
              />
              <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

const ProductsTab = ({ products, setProducts, addToast }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>>, addToast: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const initialFormState: Product = {
    id: '',
    name: '',
    price: 0,
    category: 'tshirts',
    images: [''],
    rating: 5,
    reviews: 0,
    description: '',
    colors: ['#000000'],
    sizes: ['M'],
    stock: { default: 10 },
    status: 'active'
  };

  const [formData, setFormData] = useState<Product>(initialFormState);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ ...initialFormState, id: Date.now().toString() });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      addToast('error', 'Preencha os campos obrigatórios.');
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? formData : p));
      addToast('success', 'Produto atualizado com sucesso!');
    } else {
      setProducts(prev => [...prev, formData]);
      addToast('success', 'Produto criado com sucesso!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      addToast('success', 'Produto removido.');
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h1>
           <p className="text-gray-500 text-sm">Adicione, edite ou remova produtos do catálogo.</p>
        </div>
        <Button size="md" onClick={() => handleOpenModal()} className="shadow-violet-500/20"><Plus size={18} className="mr-2" /> Novo Produto</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input 
          placeholder="Buscar produtos por nome..." 
          icon={<Search size={18} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="p-4 pl-6">Produto</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Estoque</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                         <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-violet-600 transition-colors">{product.name}</p>
                        <p className="text-xs text-gray-400">ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 capitalize">
                    <Badge variant="info">{CATEGORIES.find(c => c.id === product.category)?.name}</Badge>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-900">R$ {product.price.toFixed(2)}</td>
                  <td className="p-4 text-sm text-gray-600">{Object.values(product.stock).reduce((a, b) => a + b, 0)} un.</td>
                  <td className="p-4">
                    <Badge variant={product.status === 'active' ? 'success' : 'warning'}>
                      {product.status === 'active' ? 'Ativo' : 'Rascunho'}
                    </Badge>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(product)} className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? 'Editar Produto' : 'Novo Produto'} size="lg">
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input label="Nome do Produto" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
               <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Categoria</label>
                  <select 
                    className="block w-full rounded-xl border-gray-200 bg-white/50 focus:bg-white focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 transition-all text-sm py-2.5 px-4"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <Input label="Preço (R$)" type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
               <Input label="Preço Original" type="number" value={formData.originalPrice || ''} onChange={e => setFormData({...formData, originalPrice: parseFloat(e.target.value)})} />
               <div className="flex items-end mb-2 gap-2 col-span-2">
                 <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                   <input type="checkbox" checked={formData.isSale} onChange={e => setFormData({...formData, isSale: e.target.checked})} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                   Em Promoção
                 </label>
                 <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                   <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                   Novo Lançamento
                 </label>
               </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
               <label className="block text-sm font-bold text-gray-700 mb-2">Imagens (URLs)</label>
               <div className="space-y-2">
                 {formData.images.map((img, idx) => (
                   <div key={idx} className="flex gap-2">
                     <Input 
                        placeholder="https://..." 
                        value={img} 
                        onChange={e => {
                          const newImages = [...formData.images];
                          newImages[idx] = e.target.value;
                          setFormData({...formData, images: newImages});
                        }}
                     />
                     {idx > 0 && (
                       <Button variant="outline" onClick={() => {
                         setFormData({...formData, images: formData.images.filter((_, i) => i !== idx)});
                       }}><Trash2 size={16} /></Button>
                     )}
                   </div>
                 ))}
                 <Button variant="ghost" size="sm" onClick={() => setFormData({...formData, images: [...formData.images, '']})}>
                   + Adicionar outra imagem
                 </Button>
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Descrição</label>
              <textarea 
                className="block w-full rounded-xl border-gray-200 bg-white/50 focus:bg-white focus:border-violet-500 focus:ring focus:ring-violet-200 transition-all text-sm p-4 h-32"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
               <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
               <Button onClick={handleSave}>Salvar Produto</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

const SliderTab = ({ slides, setSlides, addToast }: { slides: Slide[], setSlides: React.Dispatch<React.SetStateAction<Slide[]>>, addToast: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  
  const initialSlideState: Slide = {
    id: '',
    image: '',
    title: '',
    subtitle: '',
    ctaText: 'Ver Mais',
    order: slides.length + 1,
    active: true
  };

  const [formData, setFormData] = useState<Slide>(initialSlideState);

  const handleOpenModal = (slide?: Slide) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData(slide);
    } else {
      setEditingSlide(null);
      setFormData({ ...initialSlideState, id: Date.now().toString() });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.image) {
      addToast('error', 'Título e Imagem são obrigatórios.');
      return;
    }
    if (editingSlide) {
      setSlides(prev => prev.map(s => s.id === editingSlide.id ? formData : s));
      addToast('success', 'Slide atualizado!');
    } else {
      setSlides(prev => [...prev, formData]);
      addToast('success', 'Novo slide adicionado!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSlides(prev => prev.filter(s => s.id !== id));
    addToast('success', 'Slide removido.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Slider da Página Inicial</h1>
          <p className="text-gray-500 text-sm">Gerencie os destaques visuais da sua loja.</p>
        </div>
        <Button onClick={() => handleOpenModal()}><Plus size={18} className="mr-2" /> Novo Slide</Button>
      </div>

      <div className="grid gap-4">
        {slides.sort((a,b) => a.order - b.order).map((slide, idx) => (
          <GlassCard key={slide.id} className="p-4 flex flex-col md:flex-row gap-6 items-center group">
             <div className="relative w-full md:w-64 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-all">
               <img src={slide.image} className="w-full h-full object-cover" alt="" />
               <div className="absolute top-2 left-2 flex gap-2">
                 <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-bold">#{slide.order}</span>
                 {slide.active ? (
                   <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded font-bold">Ativo</span>
                 ) : (
                   <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded font-bold">Inativo</span>
                 )}
               </div>
             </div>
             <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  {slide.badge && <Badge variant="primary">{slide.badge}</Badge>}
                  <h3 className="font-bold text-gray-900 truncate text-lg">{slide.title}</h3>
                </div>
                <p className="text-sm text-gray-500 truncate">{slide.subtitle}</p>
                <div className="pt-2">
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">Botão: {slide.ctaText}</span>
                </div>
             </div>
             <div className="flex items-center gap-2 self-end md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" onClick={() => handleOpenModal(slide)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(slide.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                </Button>
             </div>
          </GlassCard>
        ))}
      </div>

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSlide ? 'Editar Slide' : 'Novo Slide'}>
         <div className="space-y-4">
            <Input label="Título Principal" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <Input label="Subtítulo" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
            <Input label="Texto do Botão" value={formData.ctaText} onChange={e => setFormData({...formData, ctaText: e.target.value})} />
            <Input label="Badge (Opcional)" value={formData.badge || ''} onChange={e => setFormData({...formData, badge: e.target.value})} placeholder="Ex: NOVO, SALE" />
            
            <Input label="URL da Imagem" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
            {formData.image && (
              <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 mt-2">
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
              </div>
            )}

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                Slide Ativo
              </label>
              <div className="flex items-center gap-2">
                 <label className="text-sm font-medium text-gray-700">Ordem:</label>
                 <input type="number" className="w-16 rounded-lg border-gray-200 text-sm" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
               <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
               <Button onClick={handleSave}>Salvar Slide</Button>
            </div>
         </div>
       </Modal>
    </div>
  );
};